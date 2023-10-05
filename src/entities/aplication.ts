import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { ContactsEntity } from "./contacts";


@Entity({ name: "aplication" })
export class AplicationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar"})
    @IsString()
    pdf: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => ContactsEntity, (contact) => contact.aplication, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    contact: ContactsEntity
}
