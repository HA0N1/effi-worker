import { ColumnEntity } from 'src/column/entities/column.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity({
  name: 'board',
})
export class BoardUser {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({ type: 'bigint', nullable: false })
  userId: bigint;

  @Column({ type: 'bigint', name: 'boardId', nullable: false })
  boardId: bigint;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt?: Date;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns: ColumnEntity[];

  @ManyToOne(() => Board, (board) => board.boardUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;
}