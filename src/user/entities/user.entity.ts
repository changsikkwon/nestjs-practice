import { IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsString()
    email: string;

    @Column()
    @IsString()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hasPassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (error) {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }
    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }
}
