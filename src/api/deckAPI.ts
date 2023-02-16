import type { CardFromAPI, AllCardsFromAPI, UserCard } from '@/interfaces/cardAPI';

const baseURL = 'http://45.67.35.28:8080';

export async function getCards(token: string): Promise<AllCardsFromAPI[]> {
  const response = await fetch(`${baseURL}/cards`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function updateUserCards(userCards: UserCard[], token: string) {
  await fetch(`${baseURL}/decks/update_my_decks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userCards),
  });
}

export async function getUserCards(token: string): Promise<CardFromAPI[]> {
  const response = await fetch(`${baseURL}/decks/my_decks/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userCards: CardFromAPI[] = await response.json();
  return userCards;
}
