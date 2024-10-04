import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';
import { BattleResult } from '../battle/battleResult.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'pokemon-battle.sqlite',
  entities: [Pokemon, BattleResult],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
