import type { CardAbility } from '@/interfaces/card';

export const cardAbilitiesImg: Record<CardAbility, string> = {
  agile: '/src/assets/images/build/card_ability_agile.png',
  bond: '/src/assets/images/build/card_ability_bond.png',
  decoy: '/src/assets/images/build/card_ability_decoy.png',
  medic: '/src/assets/images/build/card_ability_medic.png',
  spy: '/src/assets/images/build/card_ability_spy.png',
  morale: '/src/assets/images/build/card_ability_morale.png',
  horn: '/src/assets/images/build/card_ability_horn.png',
  muster: '/src/assets/images/build/card_ability_muster.png',
  scorch: '/src/assets/images/build/card_ability_scorch.png',
  rain: '/src/assets/images/build/card_weather_rain.png',
  fog: '/src/assets/images/build/card_weather_fog.png',
  frost: '/src/assets/images/build/card_weather_frost.png',
  clear: '/src/assets/images/build/card_weather_clear.png',
  specScorch: '/src/assets/images/build/power_scorch.png',
};

export const cardFractionsImg: Record<number, string> = {
  2: '/src/assets/images/build/card_faction_banner_nilfgaard.png',
  4: '/src/assets/images/build/card_faction_banner_no_mans_land.png',
  1: '/src/assets/images/build/card_faction_banner_northern_realms.png',
  3: '/src/assets/images/build/card_faction_banner_scoiatael.png',
};

export const fractionsDeckImg: Record<number, string> = {
  2: '/src/assets/images/back-deck/deck_back_nilfgaard.jpg',
  4: '/src/assets/images/back-deck/deck_back_monsters.jpg',
  1: '/src/assets/images/back-deck/deck_back_realms.jpg',
  3: '/src/assets/images/back-deck/deck_back_scoiatael.jpg',
};

export const fractions = {
  2: {
    img: '/src/assets/images/faction-emblems/nilfgaard_emblem.png',
    name: 'Нильфгаард',
  },
  4: {
    img: '/src/assets/images/faction-emblems/monsters_emblem.png',
    name: 'Чудовища',
  },
  1: {
    img: '/src/assets/images/faction-emblems/northern_emblem.png',
    name: 'Королевство Севера',
  },
  3: {
    img: '/src/assets/images/faction-emblems/scoiatael_emblem.png',
    name: "Скоя'таэли",
  },
};

export type CardEquipmendType = 'melee' | 'range' | 'siege' | 'melee_range';

export const cardEquipmendImg: Record<CardEquipmendType, string> = {
  melee: '/src/assets/images/build/card_row_close.png',
  range: '/src/assets/images/build/card_row_ranged.png',
  siege: '/src/assets/images/build/card_row_siege.png',
  melee_range: '/src/assets/images/build/card_row_agile.png',
};

export enum Fractions {
  NORTHERN = 1,
  NILFGAARD = 2,
  SCOIATAEL = 3,
  MONSTERS = 4,
}
