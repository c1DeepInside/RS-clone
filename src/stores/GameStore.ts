import { defineStore } from 'pinia';
import type Card from '@/interfaces/card';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    hand: [
      {
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
      },
      {
        id: 2,
        name: 'Цирилла',
        type: 'hero',
        image: 'src/assets/images/neutral_ciri.jpg',
        description: 'Знаешь, когда сказки перестают быть сказками? Когда в них начинают верить.',
        fractionId: null,
        ability: null,
        fieldType: ['melee'],
        power: 15,
        quantity: 1,
      },
      {
        id: 3,
        name: 'Осадная башня',
        type: 'usual',
        image: 'src/assets/images/nor_siege_tower.png',
        description: 'Башня на колесах... Чего только люди не удумают!',
        fractionId: 0,
        ability: null,
        fieldType: ['siege'],
        power: 6,
        quantity: 1,
      },
      {
        id: 5,
        name: 'Таинственный эльф',
        type: 'hero',
        image: 'src/assets/images/neu_avallach.png',
        description: 'Предсказывать не сложно. Искусство в том, чтобы предсказывать точно.',
        fractionId: null,
        ability: 'spy',
        fieldType: ['melee'],
        power: '0',
        quantity: 1,
      },
      {
        id: 6,
        name: 'Лекарь Бурой Хоругви',
        type: 'usual',
        image: 'src/assets/images/nor_banner_nurse.png',
        description: 'Шейте красно с красным, желтое с желтым, белое с белым...',
        fractionId: 0,
        ability: 'medic',
        fieldType: ['siege'],
        power: 5,
        quantity: 1,
      },
      {
        id: 7,
        name: 'Командирский рог',
        type: 'special',
        image: 'src/assets/images/spc_horn.png',
        description: 'Плюс один к морали, минус три к слуху.',
        fractionId: null,
        ability: 'horn',
        fieldType: ['boost'],
        power: null,
        quantity: 3,
      },
      {
        id: 8,
        name: 'Детмольд',
        type: 'usual',
        image: 'src/assets/images/nor_dethmold.png',
        description: 'Такими чарами выиграывают войны! Тысячи жертв в одну минуту!',
        fractionId: 0,
        ability: null,
        fieldType: ['range'],
        power: 6,
        quantity: 1,
      },
      {
        id: 9,
        name: 'Талер',
        type: 'usual',
        image: 'src/assets/images/nor_thaler.png',
        description: 'Я вам всем галаза на жопу натяну!',
        fractionId: 0,
        ability: 'spy',
        fieldType: ['siege'],
        power: 1,
        quantity: 1,
      },
      {
        id: 10,
        name: 'Геральт из Ривии',
        type: 'hero',
        image: 'src/assets/images/neu_geralt.png',
        description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
        fractionId: null,
        ability: null,
        fieldType: ['melee'],
        power: 15,
        quantity: 1,
      },
      {
        id: 11,
        name: 'Геральт из Ривии',
        type: 'hero',
        image: 'src/assets/images/neu_geralt.png',
        description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
        fractionId: null,
        ability: null,
        fieldType: ['melee'],
        power: 15,
        quantity: 1,
      },
      {
        name: 'Мороз',
        type: 'special',
        image: 'src/assets/images/spc_frost.png',
        description: 'Мечта хорошего командира... кошмар плохого.',
        fractionId: null,
        ability: 'frost',
        fieldType: ['weather'],
        power: null,
        quantity: 3,
      },
      {
        name: 'Мгла',
        type: 'special',
        image: 'src/assets/images/spc_fog.png',
        description: 'Вот туман-то... хоть глаз выколи.',
        fractionId: null,
        ability: 'fog',
        fieldType: ['weather'],
        power: null,
        quantity: 3,
      },
      {
        name: 'Ливень',
        type: 'special',
        image: 'src/assets/images/spc_rain.png',
        description: 'В этом карю даже дождь смердит мочой.',
        fractionId: null,
        ability: 'rain',
        fieldType: ['weather'],
        power: null,
        quantity: 3,
      },
      {
        name: 'Ясное небо',
        type: 'special',
        image: 'src/assets/images/spc_clearsky.png',
        description: 'Дромил, солнце-то светит! Значит, и надежда есть...',
        fractionId: null,
        ability: 'clear',
        fieldType: ['weather'],
        power: null,
        quantity: 3,
      },
      {
        id: 12,
        name: 'Командирский рог',
        type: 'special',
        image: 'src/assets/images/spc_horn.png',
        description: 'Плюс один к морали, минус три к слуху.',
        fractionId: null,
        ability: 'horn',
        fieldType: ['boost'],
        power: null,
        quantity: 3,
      },
    ] as Card[],
    board: {
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
      boostEnemy: {
        siege: [] as Card[],
        range: [] as Card[],
        melee: [] as Card[],
      },
      boostAllies: {
        siege: [] as Card[],
        range: [] as Card[],
        melee: [] as Card[],
      },
      weather: [] as Card[],
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
    enemyNickName: 'kekov',
    alliesNickName: 'lulzov',
    hangUp: {
      enemy: [] as Card[],
      allies: [] as Card[],
    },
    deck: {
      enemy: [] as Card[],
      allies: [] as Card[],
    },
    leader: {
      enemy: {} as Card,
      allies: {} as Card,
    },
  }),
  actions: {
    clearWeathers() {
      this.board.weather = [];
    },
    removeFromHand(card: Card) {
      const index = this.hand.indexOf(card);
      this.hand.splice(index, 1);
    },
    setIsShowSelected(isShow: boolean) {
      this.isShowSelected = isShow;
    },
    setSelectedCard(card: Card) {
      this.selectedCard = card;
    },
    addToLine(line: string, isAllies?: boolean, isCards?: boolean) {
      if (line === 'weather') this.board.weather.push(this.selectedCard);
      if (isCards) {
        if (isAllies) {
          if (line === 'siege') this.board.allies.siege.push(this.selectedCard);
          if (line === 'range') this.board.allies.range.push(this.selectedCard);
          if (line === 'melee') this.board.allies.melee.push(this.selectedCard);
        } else {
          if (line === 'siege') this.board.enemy.siege.push(this.selectedCard);
          if (line === 'range') this.board.enemy.range.push(this.selectedCard);
          if (line === 'melee') this.board.enemy.melee.push(this.selectedCard);
        }
      } else {
        if (isAllies) {
          if (line === 'siege') this.board.boostAllies.siege.push(this.selectedCard);
          if (line === 'range') this.board.boostAllies.range.push(this.selectedCard);
          if (line === 'melee') this.board.boostAllies.melee.push(this.selectedCard);
        } else {
          if (line === 'siege') this.board.boostEnemy.siege.push(this.selectedCard);
          if (line === 'range') this.board.boostEnemy.range.push(this.selectedCard);
          if (line === 'melee') this.board.boostEnemy.melee.push(this.selectedCard);
        }
      }
    },
    removeFromLine(card: Card, line: string, isAllies?: boolean) {
      if (line === 'weather') this.board.weather.splice(this.board.weather.indexOf(card), 1);
      if (isAllies) {
        if (line === 'siege') this.board.allies.siege.splice(this.board.allies.siege.indexOf(card), 1);
        if (line === 'range') this.board.allies.range.splice(this.board.allies.range.indexOf(card), 1);
        if (line === 'melee') this.board.allies.melee.splice(this.board.allies.melee.indexOf(card), 1);
      } else {
        if (line === 'siege') this.board.enemy.siege.splice(this.board.enemy.siege.indexOf(card), 1);
        if (line === 'range') this.board.enemy.range.splice(this.board.enemy.range.indexOf(card), 1);
        if (line === 'melee') this.board.enemy.melee.splice(this.board.enemy.melee.indexOf(card), 1);
      }
    },
  },
});
