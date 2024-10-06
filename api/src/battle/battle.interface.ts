import { BattleResult } from './battleResult.entity';

export interface PaginationMetadata {
  total: number;
  pages: number;
  currentPage: number;
  pageSize: number;
}

export interface BattlesResponse {
  metadata: PaginationMetadata;
  data: BattleResult[];
}
