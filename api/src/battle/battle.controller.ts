import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleResult } from './battleResult.entity';
import { BattlesResponse } from './battle.interface';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  async battle(
    @Body() battleDto: { attackerId: string; defenderId?: string },
  ): Promise<BattleResult> {
    return this.battleService.initiateBattle(
      battleDto.attackerId,
      battleDto.defenderId,
    );
  }

  @Get()
  async getAllBattles(
    @Query('limit') limitParam: string = '10',
    @Query('page') pageParam: string = '1',
  ): Promise<BattlesResponse> {
    const limit = parseInt(limitParam, 10);
    const page = parseInt(pageParam, 10);
    const { battles, total } = await this.battleService.getAllBattles(
      limit,
      page,
    );
    const totalPages = Math.ceil(total / limit);

    return {
      metadata: {
        total,
        pages: totalPages,
        currentPage: page,
        pageSize: limit,
      },
      data: battles,
    };
  }
}
