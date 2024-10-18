import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';

@ApiTags('Pokémon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all Pokémon' })
  @ApiResponse({
    status: 200,
    description: 'A list of Pokémon retrieved successfully',
    type: [Pokemon],
  })
  async findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }
}
