import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';
import { BattleResult } from './battleResult.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(BattleResult)
    private battleResultRepository: Repository<BattleResult>,
  ) {}

  async initiateBattle(
    attackerId: string,
    defenderId?: string,
  ): Promise<BattleResult> {
    const attacker = await this.pokemonRepository.findOneBy({ id: attackerId });
    if (!attacker) throw new NotFoundException('Attacker Pokémon not found');

    let defender: Pokemon;
    if (defenderId) {
      defender = await this.pokemonRepository.findOneBy({ id: defenderId });
      if (!defender) throw new NotFoundException('Defender Pokémon not found');
    } else {
      // Select a random defender different from attacker
      const pokemons = await this.pokemonRepository.find({
        where: { id: Not(attackerId) },
      });
      const randomIndex = Math.floor(Math.random() * pokemons.length);
      defender = pokemons[randomIndex];
    }

    const winner = this.calculateBattle(attacker, defender);

    const battleResult = this.battleResultRepository.create({
      attacker,
      defender,
      winnerId: winner.id,
    });

    return this.battleResultRepository.save(battleResult);
  }

  calculateBattle(poke1: Pokemon, poke2: Pokemon): Pokemon {
    let first: Pokemon;
    let second: Pokemon;

    if (poke1.speed > poke2.speed) {
      first = poke1;
      second = poke2;
    } else if (poke2.speed > poke1.speed) {
      first = poke2;
      second = poke1;
    } else {
      // If speed is equal, higher attack goes first
      if (poke1.attack > poke2.attack) {
        first = poke1;
        second = poke2;
      } else {
        first = poke2;
        second = poke1;
      }
    }

    let hp1 = first.hp;
    let hp2 = second.hp;

    while (hp1 > 0 && hp2 > 0) {
      // First pokemon attacks
      const damage1 = Math.max(first.attack - second.defense, 1);
      hp2 -= damage1;
      if (hp2 <= 0) return first;

      // Second pokemon attacks
      const damage2 = Math.max(second.attack - first.defense, 1);
      hp1 -= damage2;
      if (hp1 <= 0) return second;
    }
  }

  async getAllBattles(
    limit: number,
    page: number,
  ): Promise<{ battles: BattleResult[]; total: number }> {
    const [battles, total] = await this.battleResultRepository.findAndCount({
      relations: ['attacker', 'defender'],
      take: limit,
      skip: (page - 1) * limit,
      order: {
        battleDate: 'DESC',
      },
    });

    return { battles, total };
  }
}
