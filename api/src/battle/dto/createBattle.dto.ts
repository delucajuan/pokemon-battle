import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateBattleDto {
  @ApiProperty({ description: 'ID of the attacker Pokémon', example: 'pokemon-1' })
  @IsString()
  attackerId: string;

  @ApiPropertyOptional({
    description: 'ID of the defender Pokémon (optional)',
    example: 'pokemon-2',
  })
  @IsOptional()
  @IsString()
  defenderId?: string;
}
