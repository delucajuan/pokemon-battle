import { Controller, Post, Body, Get } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleResult } from './battleResult.entity';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  async battle(
    @Body() battleDto: { attackerId: string; defenderId?: string },
  ): Promise<BattleResult> {
    return this.battleService.initiateBattle(battleDto.attackerId, battleDto.defenderId);
  }

  @Get()
  async getAllBattles(): Promise<BattleResult[]> {
    return this.battleService.getAllBattles();
  }
}
