import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BattleService } from './battle.service';
import { BattleResult } from './battleResult.entity';
import { BattlesResponse } from './dto/battlesResponse.dto';
import { CreateBattleDto } from './dto/createBattle.dto';
import { GetBattlesDto } from './dto/getBattles.dto';

@ApiTags('Battle')
@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  @ApiOperation({ summary: 'Initiate a new battle between two Pokémon' })
  @ApiResponse({
    status: 201,
    description: 'The battle has been successfully initiated.',
    type: BattleResult,
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 404, description: 'Attacker or defender not found' })
  async battle(@Body() battleDto: CreateBattleDto): Promise<BattleResult> {
    return this.battleService.initiateBattle(battleDto.attackerId, battleDto.defenderId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a paginated list of battles' })
  @ApiResponse({
    status: 200,
    description: 'A paginated list of battles',
    type: BattlesResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
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
