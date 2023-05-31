export function cardAnimation(element: HTMLElement, top: number, left: number) {
  element.style.transition = '0.5s';
  element.style.opacity = '0.8';
  element.style.top = `${top}vw`;
  element.style.left = `${left}vw`;
  element.style.scale = '1';
  setTimeout(() => {
    element.style.transition = '0s';
    element.style.opacity = '0';
    element.style.top = '24vw';
    element.style.left = '85vw';
    element.style.scale = '3';
  }, 400);
}

export type leftPosType = 'weather' | 'cards' | 'boost';
export type topPosType =
  | 'weather'
  | 'enemy_siege'
  | 'enemy_range'
  | 'enemy_melee'
  | 'allies_melee'
  | 'allies_range'
  | 'allies_siege';

export const leftPos: Record<leftPosType, number> = {
  weather: 12.5,
  cards: 55.5,
  boost: 31,
};

export const topPos: Record<topPosType, number> = {
  weather: 24,
  enemy_siege: 0.6,
  enemy_range: 7.5,
  enemy_melee: 14.6,
  allies_melee: 22.4,
  allies_range: 29.3,
  allies_siege: 36.5,
};
