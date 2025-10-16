import knex from "#postgres/knex.js";
import { getWarehouseName } from "./utils.js";
import { WarehouseTariffSchemaType, WarehouseTariffType } from "./warehouse.js";

export const WAREHOUSE_TABLE = "warehouses_tariff";

export const insertWarehouseTariff = async (data: WarehouseTariffType[]) => {
    const insertData = data.map((el) => ({ warehouse_data: el, warehouse: getWarehouseName(el.geoName, el.warehouseName) }));

    await knex(WAREHOUSE_TABLE).insert(insertData);
};

export const getTodayWarehousesTariff = async (): Promise<WarehouseTariffSchemaType[]> => {
    return (
        knex<WarehouseTariffSchemaType>(WAREHOUSE_TABLE)
            .whereRaw("DATE(created_at) = CURRENT_DATE")
            //TODO: remove any
            .select<any, WarehouseTariffSchemaType[]>("*")
            .distinctOn("warehouse")
            .orderBy("warehouse")
            .orderBy("created_at", "desc")
    );
};
