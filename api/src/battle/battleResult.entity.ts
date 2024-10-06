import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class BattleResult {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '1' })
  @Column()
  winnerId: string;

  @ApiProperty({ example: '2023-09-01T12:00:00Z' })
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  battleDate: Date;

  @ApiProperty()
  @ManyToOne(() => Pokemon)
  attacker: Pokemon;

  @ApiProperty()
  @ManyToOne(() => Pokemon)
  defender: Pokemon;
}
