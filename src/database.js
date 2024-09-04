// import { PGlite } from '@electric-sql/pglite'

// export const db = new PGlite('idb://contact-list')

// await db.exec(`
//     create table if not exists contacts(
//         id serial primary key,
//         name text not null,
//         created timestamp not null default now(),
//         updated timestamp not null default now()
//     );
// `)

import { knex } from "knex"
import ClientPgLite from "knex-pglite"

export const db = knex({
    client: ClientPgLite,
    dialect: "postgres",
    connection: { connectionString: 'idb://contact-list' },
})

await db.schema.createTableIfNotExists('contacts', tb => {
    tb.increments()
    tb.string('name')
    tb.timestamp('created').notNullable().defaultTo(db.fn.now())
    tb.timestamp('updated').notNullable().defaultTo(db.fn.now())
})
