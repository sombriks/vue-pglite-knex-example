import { PGlite } from '@electric-sql/pglite'

export const db = new PGlite('idb://contact-list')

await db.exec(`
    create table if not exists contacts(
        id serial primary key,
        name text not null,
        created timestamp not null default now(),
        updated timestamp not null default now()
    );
`)

// TODO add knex back