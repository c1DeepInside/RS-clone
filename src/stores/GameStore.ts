import { defineStore } from 'pinia';
import type Card from '@/interfaces/card';
import type { cardLineType, enemyAlliesType } from '@/utilits/lineTypes';
import type { IntRange } from '@/utilits/types';
import { getRandom } from '@/utilits/getRandom';
import { ClientController, HostController, type HandshakeData, connectToServer, SocketEvent, type SessionInfo } from '@/api/game';

export enum InfoBarMessage { 
  roundStart = 'roundStart',
  loseRound = 'loseRound',
  drawRound = 'drawRound',
  north = 'north',
  monsters = 'monsters',
  scoiatael = 'scoiatael',
  enemyMove = 'enemyMove',
  enemyStart = 'enemyStart',
  enemyWinRound = 'enemyWinRound',
  enemyPassed = 'enemyPassed',
  alliesStart = 'alliesStart',
  alliesMove = 'alliesMove',
  alliesWinRound = 'alliesWinRound',
  alliesPassed = 'alliesPassed',
};

const clearedBoard = {
    enemy: {
      siege: [] as Card[],
      range: [] as Card[],
      melee: [] as Card[],
    },
    allies: {
      siege: [] as Card[],
      range: [] as Card[],
      melee: [] as Card[],
    },
    enemyBoost: {
      siege: [] as Card[],
      range: [] as Card[],
      melee: [] as Card[],
    },
    alliesBoost: {
      siege: [] as Card[],
      range: [] as Card[],
      melee: [] as Card[],
    },
    weather: [] as Card[],
}

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    hand: [] as Card[],
    handsShaked: false,
    host: null as HostController | null,
    client: null as ClientController | null,
    power: {
      enemy: {
        siege: 0,
        range: 0,
        melee: 0,
      },
      allies: {
        siege: 0,
        range: 0,
        melee: 0,
      },
    },
    alliesPower: 0,
    enemyPower: 0,
    enemyHand: [] as Card[],
    selectLeader: {} as Card,
    canMove: false,
    moves: 0,
    rounds: 0,
    fractionAlly: 3 as IntRange<1, 5>,
    fractionEnemy: 2 as IntRange<1, 5>,
    infoBarMessage: InfoBarMessage.alliesStart,
    isShowInfoBar: false,
    isShowExchangePanel: false,
    isShowQuestion: false,
    isServerUpdate: false,
    alliesPassed: false,
    enemyPassed: false,
    board: JSON.parse(JSON.stringify(clearedBoard)) as typeof clearedBoard,
    // Board from the previos round
    stashedBoard: JSON.parse(JSON.stringify(clearedBoard)) as typeof clearedBoard,
    affectedBoard: {
      enemy: {
        siege: [] as Card[],
        range: [] as Card[],
        melee: [] as Card[],
      },
      allies: {
        siege: [] as Card[],
        range: [] as Card[],
        melee: [] as Card[],
      },
    },
    selectedCard: {
      id: 1,
      name: 'Геральт из Ривии',
      type: 'hero',
      image: 'src/assets/images/neu_geralt.png',
      description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
      fractionId: null,
      ability: null,
      fieldType: ['melee'],
      power: 15,
      quantity: 1,
    } as Card,
    isShowSelected: false,
    showDiscard: false,
    showHand: false,
    isMedic: false,
    whoseDiscard: 'allies',
    enemyNickName: 'Loading...',
    alliesNickName: localStorage.getItem('username') || 'Loading...',
    discard: {
      enemy: [] as Card[],
      allies: [] as Card[],
    },
    deck: {
      enemy: [] as Card[],
      allies: [] as Card[],
    },
    leader: {
      enemy: {
        id: 1,
        name: 'Фольтест Предводитель Севера',
        type: 'leader',
        fieldType: [],
        power: null,
        quantity: 1,
        description: 'Проклятая политика... Я доверяю только своему оружию.',
        ability: null,
        fractionId: 1,
        image: 'src/assets/images/realms_foltest_gold.jpg',
      } as Card,
      allies: {
        id: 28,
        name: 'Эредин Бреакк Глас Убийца Оберона',
        type: 'leader',
        fieldType: [],
        power: null,
        quantity: 1,
        description: 'Проклятая политика... Я доверяю только своему оружию.',
        ability: null,
        fractionId: 1,
        image: 'src/assets/images/realms_foltest_gold.jpg',
      } as Card,
    },
    lives: {
      enemy: 2 as IntRange<0, 3>,
      allies: 2 as IntRange<0, 3>,
    },
  }),
  getters: {
    getEnemyHand(): Card[] {
      const cardIndexes = getRandom(this.enemyHand.length, 3);
      return this.enemyHand.filter((card, index) => cardIndexes.includes(index));
    },
    getWeatherDeck(): Card[] {
      return this.deck.allies.filter(
        (card) => card.ability === 'fog' || card.ability === 'frost' || card.ability === 'rain'
      );
    },
  },
  actions: {
    putSpecScorch() {
      const lineNames = [
        ['allies', 'melee'],
        ['allies', 'range'],
        ['allies', 'siege'],
        ['enemy', 'melee'],
        ['enemy', 'range'],
        ['enemy', 'siege'],
      ];
      let affectedCards: Card[] = [];
      lineNames.forEach((lineName) => {
        const type = lineName[0] as enemyAlliesType;
        const line = lineName[1] as cardLineType;
        affectedCards = [...affectedCards, ...this.affectedBoard[type][line]];
      });
      let maxPower = -1;
      affectedCards.forEach((card: Card) => {
        if (card.power! > maxPower && card.type === 'usual') {
          maxPower = card.power!;
        }
      });
      if (maxPower >= 0) {
        lineNames.forEach((lineName) => {
          const type = lineName[0] as enemyAlliesType;
          const line = lineName[1] as cardLineType;
          this.board[type][line] = this.board[type][line].filter((card, index) => {
            if (this.affectedBoard[type][line][index].power === maxPower && card.type === 'usual') {
              this.discard[type] = [...this.discard[type], card];
            }
            return this.affectedBoard[type][line][index].power !== maxPower || card.type !== 'usual';
          });
        });
      }
    },
    putLineScorch(line: cardLineType, type: enemyAlliesType) {
      let maxPower = 10;
      this.affectedBoard[type][line].forEach((card: Card) => {
        if (card.power! >= maxPower && card.type === 'usual') {
          maxPower = card.power!;
        }
      });
      this.board[type][line] = this.board[type][line].filter((card, index) => {
        if (this.affectedBoard[type][line][index].power === maxPower && card.type === 'usual') {
          this.discard[type] = [...this.discard[type], card];
        }
        return this.affectedBoard[type][line][index].power !== maxPower || card.type !== 'usual';
      });
    },
    putLineBoost(line: cardLineType, type: enemyAlliesType) {
      if (this.board[`${type}Boost`][line].length < 1) {
        const card: Card = {
          id: 322228,
          name: 'Командирский рог',
          type: 'special',
          image: 'src/assets/images/spc_horn.png',
          description: 'Плюс один к морали, минус три к слуху.',
          fractionId: null,
          ability: 'horn',
          fieldType: ['boost'],
          power: null,
          quantity: 1,
        };
        this.board[`${type}Boost`][line].push(card);
      }
    },
    setAffectedBoard(cards: Card[], line: cardLineType, type: enemyAlliesType) {
      this.affectedBoard[type][line] = cards;
    },
    setMove(move: boolean) {
      this.canMove = move;
    },
    setPower(power: number, line: cardLineType, type: enemyAlliesType) {
      this.power[type][line] = power;
    },
    setAlliesPower() {
      this.alliesPower = this.power.allies.melee + this.power.allies.range + this.power.allies.siege;
    },
    setEnemyPower() {
      this.enemyPower = this.power.enemy.melee + this.power.enemy.range + this.power.enemy.siege;
    },
    setIsShowSelected(isShow: boolean) {
      this.isShowSelected = isShow;
    },
    setSelectedCard(card: Card) {
      this.selectedCard = card;
    },
    setShowDiscard() {
      this.showDiscard = !this.showDiscard;
    },
    clearWeathers() {
      this.discard.allies = [...this.discard.allies, ...this.board.weather];
      this.board.weather = [];
    },
    removeFromHand(card: Card) {
      const index = this.hand.indexOf(card);
      if (index >= 0) {
        this.hand.splice(index, 1);
      }
    },
    removeFromDeck(type: enemyAlliesType, card: Card) {
      const index = this.deck[type].indexOf(card);
      if (index >= 0) {
        this.deck[type].splice(index, 1);
      }
    },
    removeFromLine(cardId: number, line: cardLineType, isAllies?: boolean) {
      const key = isAllies ? 'allies' : 'enemy';
      const board = this.board[key][line];

      board.splice(cardId, 1);
    },
    setShowHand(isShow: boolean) {
      this.showHand = isShow;
    },
    addToWeather(card: Card) {
      const isHereWeather = this.board.weather.some((weatherCard: Card) => weatherCard.ability === card.ability);
      if (!isHereWeather) {
        this.board.weather.push(card);
      }
    },
    addToLine(card: Card, line: cardLineType, isAllies?: boolean, isCards?: boolean) {
      const key = isAllies ? 'allies' : 'enemy';
      if (isCards) {
        this.board[key][line].push(card);
        this.spyAbility(card, key);
        this.getDiscard(key);
      } else {
        this.board[`${key}Boost`][line].push(card);
      }
    },
    addToHand(cards: Card[]) {
      this.hand = [...this.hand, ...cards];
    },
    addToEnemyHand(cards: Card[]) {
      this.enemyHand = [...this.enemyHand, ...cards];
    },
    removeFromWeather(card: Card) {
      const index = this.board.weather.indexOf(card);
      if (index >= 0) {
        this.board.weather.splice(index, 1);
      }
    },
    spyAbility(card: Card, type: enemyAlliesType) {
      if (card.ability === 'spy') {
        const deck = type === 'enemy' ? this.deck['allies'] : this.deck['enemy'];
        const newCardsHand = deck.splice(-2, 2);
        type === 'enemy' ? this.addToHand(newCardsHand) : this.addToEnemyHand(newCardsHand);
      }
    },
    musterAbility(card: Card, line: cardLineType, isAllies: boolean, isCards: boolean) {
      if (card.ability === 'muster') {
        const deck = !isAllies ? this.deck['enemy'] : this.deck['allies'];
        const fromHand = this.hand.filter((item) => item.name.split(':')[0] === card.name.split(':')[0]);
        const newCardsHand = deck.filter((item) => item.name.split(':')[0] === card.name.split(':')[0]);
        [...fromHand, ...newCardsHand].forEach((item) => {
          this.addToLine(item, line, isAllies, isCards);
          this.removeFromDeck('allies', item);
          this.removeFromHand(item);
        });
      }
    },
    getDiscard(whoseDiscard: string) {
      const discard = whoseDiscard === 'enemy' ? this.discard.enemy : (this.discard.allies as Card[]);
      const discardMedic = discard.filter((card) => card.type === 'usual') as Card[];
      if (this.selectedCard.ability === 'medic' && discard.length !== 0 && this.isMedic) {
        this.showDiscard = true;
        this.setMedic(true);
        return discardMedic;
      }
      this.setMedic(false);
      return discard;
    },
    getLineCards(type: enemyAlliesType, line: cardLineType) {
      return this.board[type][line];
    },
    addToDiscard(card: Card, type: enemyAlliesType) {
      this.discard[type].push(card);
    },
    removeFromDiscard(card: Card, type: enemyAlliesType) {
      const index = this.discard[type].indexOf(card);
      if (index >= 0) {
        this.discard[type].splice(index, 1);
      }
    },
    setWhoseDiscard(type: enemyAlliesType) {
      this.whoseDiscard = type;
    },
    setMedic(value: boolean) {
      this.isMedic = value;
    },
    exchangeCard(card: Card) {
      if (this.deck.allies.length < 1) {
        return;
      }
      const handIndex = this.hand.indexOf(card);
      this.removeFromHand(card);
      const index = getRandom(this.deck.allies.length, 1);
      this.hand = [...this.hand.slice(0, handIndex), this.deck.allies[index[0]], ...this.hand.slice(handIndex)];
      this.deck.allies.splice(index[0], 1);
      this.deck.allies.push(card);
    },
    setDeck(cards: Card[]) {
      this.deck.allies = cards;
    },
    setDiscard(cards: Card[]) {
      this.discard.allies = cards;
    },
    setHand(cards: Card[]) {
      this.hand = cards;
    },
    setSelectedLeader(card: Card) {
      this.leader.allies = card;
    },
    setFraction(value: IntRange<1, 5>) {
      this.fractionAlly = value;
    },
    getHandshakeData(): HandshakeData {
      return {
        fractionID: this.fractionAlly,
        leader: this.leader.allies,
        username: this.alliesNickName,
      }
    },
    setHandShakeData(data: HandshakeData) {
      this.fractionEnemy = data.fractionID;
      this.leader.enemy = data.leader;
      this.enemyNickName = data.username;
    },
    showInfoBar(message: InfoBarMessage, callback: () => any = () => {}) {
      this.infoBarMessage = message;
      this.isShowInfoBar = true;
      setTimeout(() => {
        this.isShowInfoBar = false;
        callback();
      }, 1000);
    },
    passTurn() {
      this.canMove = false;
      this.alliesPassed = true;

      if (this.enemyPassed && this.host) {
        this.finishRound();
      } else {
        this.client?.sendPassTurn();
      }
    },
    clearBoard() {
      if (!this.host) {
        throw Error('Only host can clear the board!')
      }

      this.stashedBoard = JSON.parse(JSON.stringify(this.board));

      type BoardType = 'siege' | 'melee' | 'range';
      const fieldTypes: BoardType[] = ['siege', 'melee', 'range'];

      this.discard.allies = [
        ...fieldTypes.reduce((acc, fieldType) => (
          [...acc, ...this.board.allies[fieldType]]
        ), [] as Card[]),
        ...fieldTypes.reduce((acc, fieldType) => (
          [...acc, ...this.board.alliesBoost[fieldType]]
        ), [] as Card[])
      ]

      this.discard.enemy = [
        ...fieldTypes.reduce((acc, fieldType) => (
          [...acc, ...this.board.enemy[fieldType]]
        ), [] as Card[]),
        ...fieldTypes.reduce((acc, fieldType) => (
          [...acc, ...this.board.enemyBoost[fieldType]]
        ), [] as Card[])
      ]

      this.board = JSON.parse(JSON.stringify(clearedBoard));
    },
    finishRound() {
      if (!this.host) {
        throw Error('Only host can finish round!')
      }

      this.clearBoard();
      const winner = this.host.getRoundWinner();
      this.host.sendRoundInfo(winner);
      
      if (winner === this.alliesNickName) {
        this.showInfoBar(InfoBarMessage.alliesWinRound);
      } else if (winner === this.enemyNickName) {
        this.showInfoBar(InfoBarMessage.enemyWinRound);
      } else {
        this.showInfoBar(InfoBarMessage.drawRound);
      }
    },
    finishTurn() {
      if (this.hand.length === 0) {
        this.passTurn();

        return;
      }

      if (this.enemyPassed) {
        return;
      }

      this.canMove = false;
      this.client?.sendFinishTurn();
      this.showInfoBar(InfoBarMessage.enemyMove);
    },
    connect() {
      const socket = connectToServer();
      this.client = new ClientController(socket);

      const onmessage = (message: SessionInfo) => {
        if (message?.status === 'enqueued') {
          console.log('host created');
          this.host = new HostController(socket);
        }

        if (message?.status === 'game_found') {
          if (this.host) {
            this.host.initiateHandshake();
          }

          // socket.removeListener(SocketEvent.MESSAGE, onmessage);
        }
      }

      socket.addListener(SocketEvent.MESSAGE, (message) => {
        onmessage(message);
      })

      socket.open();
    }
  },
});
