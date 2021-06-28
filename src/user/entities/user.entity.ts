import { IsString } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    email: string;

    @Column()
    @IsString()
    password: string;
}
