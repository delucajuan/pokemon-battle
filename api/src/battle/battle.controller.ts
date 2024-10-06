import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleResult } from './battleResult.entity';
import { BattlesResponse } from './battle.interface';
import { CreateBattleDto } from './dto/createBattle.dto';
import { GetBattlesDto } from './dto/getBattles.dto';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  async battle(@Body() battleDto: CreateBattleDto): Promise<BattleResult> {
    return this.battleService.initiateBattle(battleDto.attackerId, battleDto.defenderId);
  }

  @Get()
  async getAllBattles(@Query() query: GetBattlesDto): Promise<BattlesResponse> {
    const limit = parseInt(query.limit || '10', 10);
    const page = parseInt(query.page || '1', 10);
    const { battles, total } = await this.battleService.getAllBattles(limit, page);
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
