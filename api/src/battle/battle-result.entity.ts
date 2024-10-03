import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class BattleResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pokemon)
  attacker: Pokemon;

  @ManyToOne(() => Pokemon)
  defender: Pokemon;

  @Column()
  winnerId: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  battleDate: Date;
}
