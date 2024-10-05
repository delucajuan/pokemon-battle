export interface FetchError extends Error {
  status?: number;
  statusText?: string;
}

export interface Pokemon {
  id: string;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl: string;
}

export interface PokemonMiniCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export interface BattleProps {
  attacker: Pokemon | null;
  defender: Pokemon | null;
  onWin: (pokemonName: string) => void;
}

export interface BattleRequest {
  attackerId: string;
  defenderId: string;
}

export interface BattleResult {
  winnerId: string;
  attacker: Fighter;
  defender: Fighter;
  id: string;
  battleDate: Date;
}

export interface Fighter {
  id: string;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl: string;
}
