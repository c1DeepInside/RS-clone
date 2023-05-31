import type { CardAbility, CardFieldType, CardType } from './card';
import type Card from './card';

export interface UserCard {
  fraction_id: number;
  cards: CardAPI[];
}

export interface CardAPI {
  card_id: number;
  quantity: number;
}

export interface CardFromAPI {
  fraction: {
    name: string;
    id: number;
  };
  cards: CardQuantity[];
}

export interface CardQuantity {
  card: Card;
  quantity: number;
}

export interface AllCardsFromAPI {
  id: number;
  name: string;
  type: CardType;
  image: string;
  description: string;
  card_ability: CardAbility | null;
  field_type: CardFieldType[];
  power: number | null;
  quantity: number;
  fraction: number | null;
}

export interface ConnectInfo {
  deck: Card[];
  hand: Card[];
  leader: Card;
  name: string;
}
