import "reflect-metadata"
import { DataSource } from "typeorm"
import { AplicationEntity } from "./entities/aplication"
import { ContactsEntity } from "./entities/contacts"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "j8M*.a:gQwyV5G",
    database: "logisticsend_b",
    synchronize: true,
    logging: false,
    entities: [AplicationEntity,ContactsEntity],
    migrations: [],
    subscribers: [],
})
