import { updateSheetValuesWithClear } from "#app/google-sheets/api.js";
import { getWbTariffes } from "#app/wb/api.js";
import { getTodayWarehousesTariff, insertWarehouseTariff } from "./repository.js";
import { runFnByInterval } from "./utils.js";

const getAndUpdateWarehousesTariffesInDB = async () => {
    const wbApikey = process.env.WB_API_KEY || "";

    const res = await getWbTariffes(wbApikey);

    const tariffes = res.response.data.warehouseList;

    if (!tariffes.length) return;

    await insertWarehouseTariff(tariffes);
};

const updateWarehousesInGoogleSheets = async (sheetId: string = "1I_cNBiOedKUGhe5LoX5MkHEBtaXC5FPLHCZlpTXVpz0", range: string = "Лист1") => {
    const warehouses = await getTodayWarehousesTariff();

    const warehousesValueForSheets: any[][] = warehouses.map((el) => {
        return [
            el.warehouse,
            el.warehouse_data.boxDeliveryBase,
            el.warehouse_data.boxDeliveryCoefExpr,
            el.warehouse_data.boxDeliveryMarketplaceBase,
            el.warehouse_data.boxDeliveryMarketplaceCoefExpr,
            el.warehouse_data.boxDeliveryMarketplaceLiter,
            el.warehouse_data.boxStorageBase,
            el.warehouse_data.boxStorageCoefExpr,
            el.warehouse_data.boxStorageLiter,
            el.created_at,
        ];
    });

    const columns = [
        "Склад",
        "Логистика, первый литр, ₽",
        "Коэффициент Логистика, %.",
        "Логистика FBS, первый литр, ₽",
        "Коэффициент FBS, %.",
        "Логистика FBS, дополнительный литр, ₽",
        "Хранение в день, первый литр, ₽",
        "Коэффициент Хранение, %.",
        "Хранение в день, дополнительный литр, ₽",
        "Дата обновления",
    ];

    updateSheetValuesWithClear(sheetId, range, [columns, ...warehousesValueForSheets]);
};

export const runAfterAppStarted = async () => {
    try {
        await getAndUpdateWarehousesTariffesInDB();
        console.log("[INFO]: Warehouses tariffes was updated in db!");
        await updateWarehousesInGoogleSheets();
        console.log("[INFO]: Warehouses tariffes was updated in google sheets!");
    } catch (error) {
        console.log(`[ERROR]: ${error}`);
        // handle error
    }
};

export const runUpdateTariffesEveryMinutes = (minutes: number) => {
    runFnByInterval(runAfterAppStarted, minutes);
};
