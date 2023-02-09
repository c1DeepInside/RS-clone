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

type CardType = 'hero' | 'usual' | 'special' | 'leader';

export default interface Card {
  id: number;
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
