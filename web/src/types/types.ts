import { CardProps } from '@mui/material';

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

export interface PokemonBattleCardProps extends CardProps {
  pokemon: Pokemon;
}

export interface BattleProps {
  attacker: Pokemon | null;
  defender: Pokemon | null;
  winnerName: string | null;
  setWinnerName: (nme: string) => void;
}

export interface BattleRequest {
  attackerId: string;
  defenderId: string;
}

export interface Battle {
  id: string;
  winnerId: string;
  battleDate: Date;
  attacker: Fighter;
  defender: Fighter;
}
export interface PaginationMetadata {
  total: number;
  pages: number;
  currentPage: number;
  pageSize: number;
}

export interface BattlesResponse {
  metadata: PaginationMetadata;
  data: Battle[];
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

export interface StatProp {
  name: string;
  value: number;
}
