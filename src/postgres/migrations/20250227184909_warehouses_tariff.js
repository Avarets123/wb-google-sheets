/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("warehouses_tariff", (table) => {
        table.uuid("id").primary().defaultTo(knex.fn.uuid());
        table.string("warehouse").index("wht_warehouse_idx").notNullable();
        table.jsonb("warehouse_data").notNullable();
        table.date("created_at").defaultTo(knex.fn.now());
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("warehouses_tariff");
}
