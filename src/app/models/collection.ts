export class ICollection {
    code!: string;
    name!: string;
    type!: string;
    booster?: (string | string[])[];
    releaseDate!: string;
    block!: string;
    onlineOnly!: boolean;
}

export class CardSet {
    code!: string;
    name!: string;
    type!: string;
    booster?: (string | string[])[];
    releaseDate!: string;
    block!: string;
    onlineOnly!: boolean;
};

export class SetsResponse {
    sets!: ICollection[] | CardSet[];
}

export class IBoosters {
    cards!: Card[]
}

export interface Card {
    name: string
    manaCost?: string
    cmc: number
    colors?: string[]
    colorIdentity?: string[]
    type: string
    types: string[]
    rarity: string
    set: string
    setName: string
    text: string
    flavor?: string
    artist: string
    number: string
    layout: string
    multiverseid: string
    imageUrl: string
    rulings?: Ruling[]
    foreignNames: ForeignName[]
    printings: string[]
    originalText: string
    originalType: string
    legalities: Legality[]
    id: string
    subtypes?: string[]
    power?: string
    toughness?: string
    supertypes?: string[]
    variations?: string[]
  }
  
  export interface Ruling {
    date: string
    text: string
  }
  
  export interface ForeignName {
    name: string
    text?: string
    type: string
    flavor?: string
    imageUrl: string
    language: string
    multiverseid: number
  }
  
  export interface Legality {
    format: string
    legality: string
  }
  
