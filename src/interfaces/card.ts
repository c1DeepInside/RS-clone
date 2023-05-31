export type CardAbility =
  | 'agile'
  | 'bond'
  | 'decoy'
  | 'medic'
  | 'spy'
  | 'morale'
  | 'horn'
  | 'muster'
  | 'scorch'
  | 'specScorch'
  | 'rain'
  | 'fog'
  | 'frost'
  | 'clear';

export type CardFieldType = 'melee' | 'range' | 'siege' | 'boost' | 'weather' | 'leader';

export type CardType = 'hero' | 'usual' | 'special' | 'leader';

export default interface Card {
  id: number;
  uuid?: string;
  name: string;
  type: CardType;
  image: string;
  description: string;
  fractionId: number | null;
  ability: CardAbility | null;
  fieldType: CardFieldType[];
  power: number | null;
  quantity: number;
}
