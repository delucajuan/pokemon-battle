import { MigrationInterface, QueryRunner } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';
import pokemonData from '../../data/pokemon.json';

export class SeedPokemon1727992786827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const pokemon of pokemonData.pokemon) {
      await queryRunner.manager
        .getRepository(Pokemon)
        .save(queryRunner.manager.getRepository(Pokemon).create(pokemon));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Pokemon).delete({});
  }
}
