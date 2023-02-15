import type Card from '@/interfaces/card';
import type { UserCard } from '@/interfaces/cardAPI';

const baseURL = '';

export async function getCards(): Promise<Card[]> {
  const response = await fetch(`${baseURL}/cards`);
  return await response.json();
}

export async function updateUserCards(userCards: UserCard[]) {
  const response: Response = await fetch(`${baseURL}/decks/update_my_decks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCards),
  });
}

export async function getUserCards(): Promise<UserCard[]> {
  const response = await fetch(`${baseURL}/decks/my_decks/`);
  const userCards: UserCard[] = await response.json();
  return userCards;
}
