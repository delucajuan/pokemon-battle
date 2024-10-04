import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from 'src/pokemon/pokemon.entity';
import { BattleResult } from './battleResult.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, BattleResult])],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
