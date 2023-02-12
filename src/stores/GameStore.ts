import { defineStore } from 'pinia';
import type Card from '@/interfaces/card';
import type { cardLineType, enemyAlliesType } from '@/utilits/lineTypes';
import type { IntRange } from '@/utilits/types';
import { getRandom } from '@/utilits/getRandom';

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
        id: 14,
        name: 'Поддержка гавенкаров',
        type: 'usual',
        image: 'src/assets/images/sco_havekar_support_1.png',
        description: 'Я дерусь за тех, кто больше платит. Или за тех, у кого можно больше утащить.',
        fractionId: 2,
        ability: 'muster',
        fieldType: ['melee'],
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
      {
        id: 13,
        name: 'Боец Синих Полосок',
        type: 'usual',
        image: 'src/assets/images/nor_blue_stripes.png',
        description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
        fractionId: 0,
        ability: 'bond',
        fieldType: ['melee'],
        power: 4,
        quantity: 1,
      },
      {
        id: 13,
        name: 'Боец Синих Полосок',
        type: 'usual',
        image: 'src/assets/images/nor_blue_stripes.png',
        description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
        fractionId: 0,
        ability: 'bond',
        fieldType: ['melee'],
        power: 4,
        quantity: 1,
      },
      {
        id: 13,
        name: 'Боец Синих Полосок',
        type: 'usual',
        image: 'src/assets/images/nor_blue_stripes.png',
        description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
        fractionId: 0,
        ability: 'bond',
        fieldType: ['melee'],
        power: 4,
        quantity: 1,
      },
      {
        id: 14,
        name: 'Каэдвенский осадный мастер',
        type: 'usual',
        image: 'src/assets/images/nor_kaedwen_siege.png',
        description: 'Откалибруйте базу на пять градусов! - Так точ... Сука, чо?',
        fractionId: 0,
        ability: 'morale',
        fieldType: ['siege'],
        power: 1,
        quantity: 1,
      },
      {
        id: 14,
        name: 'Каэдвенский осадный мастер',
        type: 'usual',
        image: 'src/assets/images/nor_kaedwen_siege.png',
        description: 'Откалибруйте базу на пять градусов! - Так точ... Сука, чо?',
        fractionId: 0,
        ability: 'morale',
        fieldType: ['siege'],
        power: 1,
        quantity: 1,
      },
      {
        id: 14,
        name: 'Каэдвенский осадный мастер',
        type: 'usual',
        image: 'src/assets/images/nor_kaedwen_siege.png',
        description: 'Откалибруйте базу на пять градусов! - Так точ... Сука, чо?',
        fractionId: 0,
        ability: 'morale',
        fieldType: ['siege'],
        power: 1,
        quantity: 1,
      },
      {
        id: 15,
        name: 'Казнь',
        type: 'special',
        image: 'src/assets/images/spc_scorch.png',
        description: 'Огненные столпы обращают в пепел. Остальные благовейно трепещут.',
        fractionId: null,
        ability: 'specScorch',
        fieldType: ['weather'],
        power: null,
        quantity: 3,
      },
      {
        id: 16,
        name: 'Виллентретенмерт',
        type: 'usual',
        image: 'src/assets/images/neu_villen.png',
        description: 'Дракон ушел от удара мягким, ловким, полным грации поворотом.',
        fractionId: null,
        ability: 'scorch',
        fieldType: ['melee'],
        power: 7,
        quantity: 1,
      },
      {
        id: 78,
        name: 'Чучело',
        type: 'special',
        image: 'src/assets/images/special_decoy.jpg',
        description: 'Пусть стреляют по крестьянам. А нет крестьян - поставьте чучела.',
        fractionId: null,
        ability: 'decoy',
        fieldType: ['melee', 'range', 'siege'],
        power: null,
        quantity: 3,
      },
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
    enemyHand: [
      {
        id: 13,
        name: 'Боец Синих Полосок',
        type: 'usual',
        image: 'src/assets/images/nor_blue_stripes.png',
        description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
        fractionId: 0,
        ability: 'bond',
        fieldType: ['melee'],
        power: 4,
        quantity: 1,
      },
      {
        id: 13,
        name: 'Боец Синих Полосок',
        type: 'usual',
        image: 'src/assets/images/nor_blue_stripes.png',
        description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
        fractionId: 0,
        ability: 'bond',
        fieldType: ['melee'],
        power: 4,
        quantity: 1,
      },
      {
        id: 13,
        name: 'Боец Синих Полосок',
        type: 'usual',
        image: 'src/assets/images/nor_blue_stripes.png',
        description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
        fractionId: 0,
        ability: 'bond',
        fieldType: ['melee'],
        power: 4,
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
    board: {
      enemy: {
        siege: [
          {
            id: 13,
            name: 'Боец Синих Полосок',
            type: 'usual',
            image: 'src/assets/images/nor_blue_stripes.png',
            description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
            fractionId: 0,
            ability: 'bond',
            fieldType: ['melee'],
            power: 4,
            quantity: 1,
          },
        ] as Card[],
        range: [
          {
            id: 13,
            name: 'Боец Синих Полосок',
            type: 'usual',
            image: 'src/assets/images/nor_blue_stripes.png',
            description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
            fractionId: 0,
            ability: 'bond',
            fieldType: ['melee'],
            power: 8,
            quantity: 1,
          },
        ] as Card[],
        melee: [
          {
            id: 13,
            name: 'Боец Синих Полосок',
            type: 'usual',
            image: 'src/assets/images/nor_blue_stripes.png',
            description: 'Для Темерии я готов на все. Но обычно я для нее только убиваю.',
            fractionId: 0,
            ability: 'bond',
            fieldType: ['melee'],
            power: 10,
            quantity: 1,
          },
        ] as Card[],
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
          id: 29,
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
          id: 28,
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
          id: 100,
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
          id: 100,
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
          quantity: 1,
        },
        {
          id: 16,
          name: 'Поддержка гавенкаров',
          type: 'usual',
          image: 'src/assets/images/sco_havekar_support_3.png',
          description: 'Я дерусь за тех, кто больше платит. Или за тех, у кого можно больше утащить.',
          fractionId: 2,
          ability: 'muster',
          fieldType: ['melee'],
          power: 5,
          quantity: 1,
        },
      ] as Card[],
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
        fractionId: 0,
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
        fractionId: 0,
        image: 'src/assets/images/realms_foltest_gold.jpg',
      } as Card,
    },
    lives: {
      enemy: 1 as IntRange<0, 3>,
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
      this.discard.allies = [...this.discard.allies, ...this.board.weather];
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
    setIsShowSelected(isShow: boolean) {
      this.isShowSelected = isShow;
    },
    setShowHand(isShow: boolean) {
      this.showHand = isShow;
    },
    setSelectedCard(card: Card) {
      this.selectedCard = card;
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
        const newCardsHand = deck.filter((item) => item.name.split(':')[0] === card.name.split(':')[0]);
        newCardsHand.forEach((item) => {
          this.addToLine(item, line, isAllies, isCards);
          this.removeFromDeck('allies', item);
        });
      }
    },
    getDiscard(whoseDiscard: string) {
      const discard = whoseDiscard === 'enemy' ? this.discard.enemy : (this.discard.allies as Card[]);
      const discardMedic = discard.filter((card) => card.type === 'usual') as Card[];
      if (this.selectedCard.ability === 'medic' && discard.length !== 0 && this.isMedic) {
        this.showDiscard = true;
        // this.isMedic = true;
        return discardMedic;
      }
      return discard;
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
    setShowDiscard() {
      this.showDiscard = !this.showDiscard;
    },
    setWhoseDiscard(type: enemyAlliesType) {
      this.whoseDiscard = type;
    },
    setMedic(value: boolean) {
      this.isMedic = value;
    },
    exchangeCard(card: Card) {
      const handIndex = this.hand.indexOf(card);
      this.removeFromHand(card);
      const index = getRandom(this.deck.allies.length, 1);
      this.hand = [...this.hand.slice(0, handIndex), this.deck.allies[index[0]], ...this.hand.slice(handIndex)];
      this.deck.allies.splice(index[0], 1);
      this.deck.allies.push(card);
    },
  },
});
