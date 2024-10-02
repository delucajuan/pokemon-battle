import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  providers: [],
  controllers: [],
})
export class PokemonModule {}
