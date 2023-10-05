import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { AplicationEntity } from "./aplication";


@Entity({ name: "contacts" })
export class ContactsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar",nullable:true })
    @IsString()
    weekly_package: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    deliver_to: string

    @Column({ type: "varchar" })
    @IsString()
    company_name: string

    @Column({ type: "varchar" })
    @IsString()
    contact_name: string

    @Column({ type: "varchar" })
    @IsString()
    phone: string

    @Column({ type: "varchar" })
    @IsString()
    email: string

    @Column({ type: "varchar",nullable:true })
    @IsString()
    inQuery: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(() => AplicationEntity, (aplication) => aplication.contact, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    aplication: AplicationEntity[]
}
