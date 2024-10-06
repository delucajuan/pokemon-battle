import { ApiProperty } from '@nestjs/swagger';
import { BattleResult } from '../battleResult.entity';

class PaginationMetadata {
  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 10 })
  pages: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  pageSize: number;
}

export class BattlesResponse {
  @ApiProperty({ type: PaginationMetadata })
  metadata: PaginationMetadata;

  @ApiProperty({ type: [BattleResult] })
  data: BattleResult[];
}
