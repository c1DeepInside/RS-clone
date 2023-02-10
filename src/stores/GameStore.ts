import { defineStore } from 'pinia';
import type Card from '@/interfaces/card';
import type { cardLineType, enemyAlliesType } from '@/utilits/lineTypes';
import type { IntRange } from '@/utilits/types';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    hand: [
      // {
      //   id: 1,
      //   name: 'Геральт из Ривии',
      //   type: 'hero',
      //   image: 'src/assets/images/neu_geralt.png',
      //   description: 'Если надо выбирать между ожни злом и другим, я предпочитаю не выбирать.',
      //   fractionId: null,
      //   ability: null,
      //   fieldType: ['melee'],
      //   power: 15,
      //   quantity: 1,
      // },
      // {
      //   id: 2,
      //   name: 'Цирилла',
      //   type: 'hero',
      //   image: 'src/assets/images/neutral_ciri.jpg',
      //   description: 'Знаешь, когда сказки перестают быть сказками? Когда в них начинают верить.',
      //   fractionId: null,
      //   ability: null,
      //   fieldType: ['melee'],
      //   power: 15,
      //   quantity: 1,
      // },
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
      // {
      //   id: 5,
      //   name: 'Таинственный эльф',
      //   type: 'hero',
      //   image: 'src/assets/images/neu_avallach.png',
      //   description: 'Предсказывать не сложно. Искусство в том, чтобы предсказывать точно.',
      //   fractionId: null,
      //   ability: 'spy',
      //   fieldType: ['melee'],
      //   power: '0',
      //   quantity: 1,
      // },
      {
        id: 6,
        name: 'Лекарь Бурой Хоругви',
        type: 'usual',
        image: 'src/assets/images/nor_banner_nurse.png',
        description: 'Шейте красно с красным, желтое с желтым, белое с белым...',
        fractionId: 3,
        ability: 'medic',
        fieldType: ['siege'],
        power: 5,
        quantity: 1,
      },
      {
        id: 15,
        name: 'Поддержка гавенкаров',
        type: 'usual',
        image: 'src/assets/images/sco_havekar_support_1.png',
        description: 'Я дерусь за тех, кто больше платит. Или за тех, у кого можно больше утащить.',
        fractionId: 2,
        ability: 'muster',
        fieldType: ['melee'],
        power: 5,
        quantity: 1
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
      // {
      //   id: 9,
      //   name: 'Мороз',
      //   type: 'special',
      //   image: 'src/assets/images/spc_frost.png',
      //   description: 'Мечта хорошего командира... кошмар плохого.',
      //   fractionId: null,
      //   ability: 'frost',
      //   fieldType: ['weather'],
      //   power: null,
      //   quantity: 3,
      // },
      // {
      //   id: 9,
      //   name: 'Мгла',
      //   type: 'special',
      //   image: 'src/assets/images/spc_fog.png',
      //   description: 'Вот туман-то... хоть глаз выколи.',
      //   fractionId: null,
      //   ability: 'fog',
      //   fieldType: ['weather'],
      //   power: null,
      //   quantity: 3,
      // },
      // {
      //   id: 9,
      //   name: 'Ливень',
      //   type: 'special',
      //   image: 'src/assets/images/spc_rain.png',
      //   description: 'В этом карю даже дождь смердит мочой.',
      //   fractionId: null,
      //   ability: 'rain',
      //   fieldType: ['weather'],
      //   power: null,
      //   quantity: 3,
      // },
      // {
      //   id: 9,
      //   name: 'Ясное небо',
      //   type: 'special',
      //   image: 'src/assets/images/spc_clearsky.png',
      //   description: 'Дромил, солнце-то светит! Значит, и надежда есть...',
      //   fractionId: null,
      //   ability: 'clear',
      //   fieldType: ['weather'],
      //   power: null,
      //   quantity: 3,
      // },
      // {
      //   id: 12,
      //   name: 'Командирский рог',
      //   type: 'special',
      //   image: 'src/assets/images/spc_horn.png',
      //   description: 'Плюс один к морали, минус три к слуху.',
      //   fractionId: null,
      //   ability: 'horn',
      //   fieldType: ['boost'],
      //   power: null,
      //   quantity: 3,
      // },
      // {
      //   id: 13,
      //   name: 'Боец Синих Полосок',
      //   type: 'usual',
      //   image: 'src/assets/images/nor_blue_stripes.png',
      //   description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
      //   fractionId: 0,
      //   ability: 'bond',
      //   fieldType: ['melee'],
      //   power: 4,
      //   quantity: 1,
      // },
    ] as Card[],
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
    discard: {
      enemy: [
        {
          id: 1,
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
      ] as Card[],
      allies: [
        {
          id: 4,
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
          id: 2,
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
    },
    deck: {
      enemy: [
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
      ] as Card[],
      allies: [
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
          id: 15,
          name: 'Поддержка гавенкаров',
          type: 'usual',
          image: 'src/assets/images/sco_havekar_support_2.png',
          description: 'Я дерусь за тех, кто больше платит. Или за тех, у кого можно больше утащить.',
          fractionId: 2,
          ability: 'muster',
          fieldType: ['melee'],
          power: 5,
          quantity: 1
        },
        {
          id: 15,
          name: 'Поддержка гавенкаров',
          type: 'usual',
          image: 'src/assets/images/sco_havekar_support_3.png',
          description: 'Я дерусь за тех, кто больше платит. Или за тех, у кого можно больше утащить.',
          fractionId: 2,
          ability: 'muster',
          fieldType: ['melee'],
          power: 5,
          quantity: 1
        },
      ] as Card[],
    },
    leader: {
      enemy: {
        id: 4,
        name: 'Фольтест Король Темерии',
        type: 'leader',
        image: '/src/assets/images/realms_foltest_silver.jpg',
        description: 'Родственная любовь? Что может быть прекраснее, чем сестра на коленях брата?',
        fractionId: 1,
        ability: null,
        fieldType: ['leader'],
        power: null,
        quantity: 1,
      } as Card,
      allies: {
        id: 4,
        name: 'Фольтест Король Темерии',
        type: 'leader',
        image: '/src/assets/images/realms_foltest_silver.jpg',
        description: 'Родственная любовь? Что может быть прекраснее, чем сестра на коленях брата?',
        fractionId: 0,
        ability: null,
        fieldType: ['leader'],
        power: null,
        quantity: 1,
      } as Card,
    },
    lives: {
      enemy: 1 as IntRange<0, 3>,
      allies: 2 as IntRange<0, 3>,
    }
  }),
  actions: {
    setPower(power: number, line: cardLineType, type: enemyAlliesType) {
      this.power[type][line] = power;
    },
    setAlliesPower() {
      this.alliesPower = this.power.allies.melee + this.power.allies.range + this.power.allies.siege;
    },
    setEnemyPower() {
      this.enemyPower = this.power.enemy.melee + this.power.enemy.range + this.power.enemy.siege;
    },
    clearWeathers() {
      this.board.weather = [];
    },
    addToHand(cards: Card[]) {
      this.hand = [...this.hand, ...cards];
    },
    addToEnemyHand(cards: Card[]) {
      this.enemyHand = [...this.enemyHand, ...cards];
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
    addToWeather(card: Card) {
      this.board.weather.push(card);
    },
    addToLine(card: Card, line: cardLineType, isAllies?: boolean, isCards?: boolean) {
      const key = isAllies ? 'allies' : 'enemy';
      if (isCards) {
        this.board[key][line].push(card);
        this.spyAbility(card, key);
      } else {
        this.board[`${key}Boost`][line].push(card);
      }
    },
    removeFromWeather(card: Card) {
      this.board.weather.splice(this.board.weather.indexOf(card), 1);
    },
    removeFromLine(card: Card, line: cardLineType, isAllies?: boolean) {
      const key = isAllies ? 'allies' : 'enemy';
      this.board[key][line].push(card);
    },
    spyAbility(card: Card, type: enemyAlliesType) {
      if (card.ability === 'spy') {
        const deck = type === 'enemy' ? this.deck['allies'] : this.deck['enemy'];
        const newCardsHand = deck.length === 0 ? [] : deck.splice(-2, 2) as Card[];
        type === 'enemy' ? this.addToHand(newCardsHand) : this.addToEnemyHand(newCardsHand);
      }
    },
    musterAbility(card: Card, line: cardLineType, isAllies: boolean, isCards: boolean) {
      if (card.ability === 'muster') {
        const deck = !isAllies ? this.deck['enemy'] : this.deck['allies'];
        const newCardsHand = deck.filter((item) => item.name.split(':')[0] === card.name.split(':')[0]);
        newCardsHand.forEach((item) => {
          this.addToLine(item, line, isAllies, isCards)
        });
      }
    }
  },
});
