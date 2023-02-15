export interface UserCard {
  fraction_id: number;
  cards: CardAPI[];
}

export interface CardAPI {
  card_id: number;
  quantity: number;
}
