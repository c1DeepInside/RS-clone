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
  ROUND_END = 'round_end'
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

  private getUserWithBiggestScore(): string | null {
    const state = this.store.$state;

    if (state.alliesPower > state.enemyPower) {
      return state.alliesNickName;
    }

    if (state.enemyPower > state.alliesPower) {
      return state.enemyNickName;
    }

    return null;
  }

  private isWinner(isEnemy: boolean): boolean {
    const username = isEnemy 
      ? this.store.$state.enemyNickName 
      : this.store.$state.alliesNickName;
    const winner = this.getUserWithBiggestScore();

    return username === winner;
  }

  private processNilfgardAbility(isEnemy: boolean): boolean {
    // TODO: Check if it's the last round
    const winner = this.getUserWithBiggestScore();

    if (!winner) {
      return true;
    }

    return this.isWinner(isEnemy);
  }

  private processNorthAbility(isEnemy: boolean): boolean {
    // TODO: Run the code below only if round was a win

    const key = isEnemy
      ? 'enemy'
      : 'allies';

    if (this.store.$state.lives[key] > 0) {
      const index = Math.floor(Math.random() * this.store.$state.deck[key].length);
      const card = this.store.$state.deck[key][index];
      
      // TODO: Remove form deck and add to hand
    }

    return this.isWinner(isEnemy);
  }

  private processMonstersAbility(isEnemy: boolean): boolean {
    const key = isEnemy
      ? 'enemy'
      : 'allies';

    type BoardField = 'siege' | 'melee' | 'range';

    // @ts-ignore
    const fieldKeys: BoardField[] = Object.entries(
      this.store.$state.stashedBoard[key]
    ).reduce((acc: BoardField[], [key, value]: [BoardField, Card[]]) => {
      return [
        ...acc,
        ...(value.length > 0 ? [key] : [])
      ]
    }, [] as BoardField[]);

    if (fieldKeys.length === 0) {
      return true;
    }

    const fieldIndex = Math.floor(Math.random() * fieldKeys.length);
    const lookupField = this.store.$state.stashedBoard[key][fieldKeys[fieldIndex]]

    if (this.store.$state.lives[key] > 0) {
      const index = Math.floor(Math.random() * lookupField.length);
      const card = lookupField[index];

      // TODO: Do not add to discard and leave the card on the board
    }

    return this.isWinner(isEnemy);
  }

  public getRoundWinner(): string | null {
    const processMap = {
      [Fractions.MONSTERS]: (isEnemy: boolean) => this.processMonstersAbility(isEnemy),
      [Fractions.NORTHERN]: (isEnemy: boolean) => this.processNorthAbility(isEnemy),
      [Fractions.NILFGAARD]: (isEnemy: boolean) => this.processNilfgardAbility(isEnemy),
      [Fractions.SCOIATAEL]: () => {},
    }

    const allyWin = processMap[this.store.$state.fractionAlly](false);
    const enemyWin = processMap[this.store.$state.fractionEnemy](true);

    if (allyWin) {
      return this.store.$state.alliesNickName;
    }
    
    if (enemyWin) {
      return this.store.$state.enemyNickName;
    }

    return null;
  }

  public sendRoundInfo(winner: string | null) {
    this.socket.sendMessage({
      type: MessageType.ROUND_END,
      payload: {
        winner,
        lives: {
          allies: this.store.$state.lives.enemy,
          enemy: this.store.$state.lives.allies,
        },
        discard: {
          allies: this.store.$state.discard.enemy,
          enemy: this.store.$state.discard.allies,
        }
      }
    })

    // To reset other player's board

    const board = this.store.$state.board;

    this.socket.sendMessage({
      type: MessageType.BOARD_CHANGE,
      payload: {
        cardsInHand: this.store.$state.hand.length,
        board: {
          allies: board.enemy,
          alliesBoost: board.enemyBoost,
        }
      }
    })
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
    // TODO: Decompose on separate functions
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
          } else {
            this.store.finishRound();
          }
        })
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

    if (message.type === MessageType.ROUND_END) {
      this.store.$state.lives = message.payload.lives;
      this.store.$state.discard = message.payload.discard;

      const winner = message.payload.winner;
      const enemy = this.store.$state.enemyNickName;
      const allies = this.store.$state.alliesNickName;

      if (winner === allies) {
        this.store.showInfoBar(InfoBarMessage.alliesWinRound);
      } else if (winner === enemy) {
        this.store.showInfoBar(InfoBarMessage.enemyWinRound);
      } else {
        this.store.showInfoBar(InfoBarMessage.drawRound);
      }
    }
  }
}