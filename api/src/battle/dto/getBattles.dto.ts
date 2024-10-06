import { IsNumberString, IsOptional } from 'class-validator';

export class GetBattlesDto {
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;
}
