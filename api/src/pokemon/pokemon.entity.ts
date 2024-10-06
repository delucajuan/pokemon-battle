import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pokemon {
  @ApiProperty({ example: 'pokemon-1' })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ example: 'Pikachu' })
  @Column()
  name: string;

  @ApiProperty({ example: 4 })
  @Column('int')
  attack: number;

  @ApiProperty({ example: 3 })
  @Column('int')
  defense: number;

  @ApiProperty({ example: 3 })
  @Column('int')
  hp: number;

  @ApiProperty({ example: 6 })
  @Column('int')
  speed: number;

  @ApiProperty({ example: 'Electric' })
  @Column()
  type: string;

  @ApiProperty({ example: 'https://example.com/pikachu.png' })
  @Column()
  imageUrl: string;
}
