import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  create(pokemonData: Partial<Pokemon>): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(pokemonData);
    return this.pokemonRepository.save(pokemon);
  }

  findById(id: string): Promise<Pokemon> {
    return this.pokemonRepository.findOneBy({ id });
  }
}
