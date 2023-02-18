import type Card from "@/interfaces/card";
import { InfoBarMessage, useGameStore } from "@/stores/GameStore";
import { Fractions } from "@/utilits/cardBuildImgs";
import type { IntRange } from "@/utilits/types";

const URL = '45.67.35.28:8080';
const TOKEN = localStorage.getItem('token');

// const TOKEN = '0016f14892064fae90c95b2157e8e64e6b8a953a';
// const TOKEN_2 = 'fb09ba9c2639adbca971d7526e596d39ad91b20e';

export interface SessionInfo {
  status: 'game_found' | 'enqueued',
  session_info: {
    uuid: string,
    username: string,
  }
}

export interface HandshakeData {
  fractionID: IntRange<1, 5>,
  leader: Card,
  username: string,
}

export function connectToServer(): Socket {
  return new Socket(`ws://${URL}/ws/game/?token=${TOKEN}`);
}

type SubFunction = (...args: any) => any;

export enum MessageType {
  HANDSHAKE = 'handshake',
  TURN_INFO = 'turn_info',
  BOARD_CHANGE = 'board_change',
}

export enum TurnInfoEnum {
  USER = 'user',
  SHOW_SELECTION = 'show_selection',
  ENDED = 'ended',
  PASS = 'pass',
}

export enum SocketEvent {
  MESSAGE,
  CONNECTION,
  ERROR,
}

export interface SocketMessage {
  type: MessageType,
  payload: any,
}

export class Socket {
  private socket?: WebSocket;
  private subscribers: Record<SocketEvent, SubFunction[]> = {
    [SocketEvent.CONNECTION]: [],
    [SocketEvent.MESSAGE]: [],
    [SocketEvent.ERROR]: [],
  };

  constructor(private url: string) {}

  public open() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = (...args) => {
      console.log('connected')
      this.onConnection(...args);
    }

    this.socket.onmessage = (message) => {
      console.log(message);
      this.onMessage(JSON.parse(message.data));
    }

    this.socket.onerror = (...args) => {
      console.log('error!', ...args)
      this.onError(...args);
    }

    this.socket.onclose = (...args) => {
      console.log('closed!')
    }

    console.log('opened')
  }

  public addListener(event: SocketEvent, fn: SubFunction) {
    console.log('added event')
    this.subscribers[event].push(fn);
  }

  public removeListener(event: SocketEvent, fn: SubFunction) {
    const idx = this.subscribers[event].indexOf(fn);
    this.subscribers[event].splice(idx, 1);
  }

  public sendMessage(message: SocketMessage) {
    this.socket?.send(JSON.stringify(message))
  }

  private onConnection(...args: [Event]) {
    this.subscribers[SocketEvent.CONNECTION].forEach(fn => fn(...args));
  }

  private onMessage(message: SocketMessage | SessionInfo) {
    this.subscribers[SocketEvent.MESSAGE].forEach(fn => fn(message));
  }

  private onError(...args: [Event]) {
    this.subscribers[SocketEvent.ERROR].forEach(fn => fn(...args));
  }
}

export class HostController {
  private store = useGameStore();

  constructor(private socket: Socket) {
    this.socket.addListener(SocketEvent.MESSAGE, (message) => {
      this.onMessage(message);
    });
  }

  public initiateHandshake() {
    this.socket.sendMessage({
      type: MessageType.HANDSHAKE,
      payload: this.store.getHandshakeData(),
    })
  }

  private onMessage(message: SocketMessage) {
    console.log("host message!");
    if (message.type === MessageType.HANDSHAKE) {
      this.determineTurn();
    }
  }

  private determineTurn() {
    const enemy = this.store.$state.fractionEnemy;
    const ally = this.store.$state.fractionAlly;

    const setRandomTurn = () => {
      const player = Math.floor(Math.random() * 2) === 0 
        ? this.store.$state.alliesNickName
        : this.store.$state.enemyNickName;

      this.socket.sendMessage({
        type: MessageType.TURN_INFO,
        payload: {
          action: TurnInfoEnum.USER,
          username: player,
        }
      })

      if (player === this.store.$state.alliesNickName) {
        this.store.$state.canMove = true;
      }

      setTimeout(() => {
        const message = this.store.$state.canMove
          ? InfoBarMessage.alliesStart
          : InfoBarMessage.enemyStart;

        this.store.showInfoBar(InfoBarMessage.roundStart, () => {
          this.store.showInfoBar(message, () => {
            this.store.$state.isShowExchangePanel = true;
          });
        })
      }, 1000)

    }

    if (enemy === Fractions.SCOIATAEL && ally == Fractions.SCOIATAEL) {
      setRandomTurn();
    } else if (enemy === Fractions.SCOIATAEL) {
      this.socket.sendMessage({
        type: MessageType.TURN_INFO,
        payload: {
          action: TurnInfoEnum.SHOW_SELECTION,
        }
      })
    } else if (ally === Fractions.SCOIATAEL) {
      this.store.$state.isShowQuestion = true;
    } else {
      setRandomTurn();
    }
  }
}

export class ClientController {
  private store = useGameStore();

  constructor(private socket: Socket) {
    this.socket.addListener(SocketEvent.MESSAGE, (message) => {
      this.onMessage(message);
    });
  }

  public respondHandshake() {
    this.store.$state.handsShaked = true;
    this.socket.sendMessage({
      type: MessageType.HANDSHAKE,
      payload: this.store.getHandshakeData(),
    })
  }

  public sendTurnInfo() {
    this.socket.sendMessage({
      type: MessageType.TURN_INFO,
      payload: {
        action: TurnInfoEnum.USER,
        username: this.store.$state.canMove
          ? this.store.$state.alliesNickName
          : this.store.$state.enemyNickName
      }
    });
  }

  public sendBoardChange() {
    const board = this.store.$state.board;

    this.socket.sendMessage({
      type: MessageType.BOARD_CHANGE,
      payload: {
        cardsInHand: this.store.$state.hand.length,
        board: {
          enemy: board.allies,
          enemyBoost: board.alliesBoost,
          weather: board.weather,
        }
      }
    })
  }

  public sendPassTurn() {
    this.socket.sendMessage({
      type: MessageType.TURN_INFO,
      payload: {
        action: TurnInfoEnum.PASS,
      }
    })
  }

  public sendFinishTurn() {
    this.socket.sendMessage({
      type: MessageType.TURN_INFO,
      payload: {
        action: TurnInfoEnum.ENDED,
      }
    })
  }

  private onMessage(message: SocketMessage) {
    if (message.type === MessageType.HANDSHAKE) {
      if (!this.store.$state.handsShaked) {
        this.store.setHandShakeData(message.payload);
        this.respondHandshake();
      }
    }

    if (message.type === MessageType.TURN_INFO) {
      if (message.payload.action === TurnInfoEnum.USER) {
        this.store.$state.canMove = 
          message.payload.username === this.store.$state.alliesNickName;
        
        const barMessage = this.store.$state.canMove
          ? InfoBarMessage.alliesStart
          : InfoBarMessage.enemyStart;

        this.store.showInfoBar(InfoBarMessage.roundStart, () => {
          this.store.showInfoBar(barMessage, () => {
            this.store.$state.isShowExchangePanel = true;
          });
        })
      } else if (message.payload.action === TurnInfoEnum.SHOW_SELECTION) {
        this.store.$state.isShowQuestion = true;
      } else if (message.payload.action === TurnInfoEnum.ENDED) {
        this.store.showInfoBar(InfoBarMessage.alliesMove, () => {
          this.store.$state.canMove = true;
        })
      } else if (message.payload.action === TurnInfoEnum.PASS) {
        this.store.showInfoBar(InfoBarMessage.enemyPassed, () => {
          this.store.$state.enemyPassed = true;

          if (!this.store.$state.alliesPassed) {
            this.store.$state.canMove = true;
          }
        })

        // TODO: Add more logic regarding player's pass
      } else {
        throw Error('Unknown TurnInfo type!');
      }
    }

    if (message.type === MessageType.BOARD_CHANGE) {
      this.store.$state.isServerUpdate = true;
      this.store.$state.board = {
        ...this.store.$state.board,
        ...message.payload.board,
      }
    }
  }
}