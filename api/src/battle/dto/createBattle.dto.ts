import { IsString, IsOptional } from 'class-validator';

export class CreateBattleDto {
  @IsString()
  attackerId: string;

  @IsOptional()
  @IsString()
  defenderId?: string;
}
