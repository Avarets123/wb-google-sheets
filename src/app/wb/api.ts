import { WBWarehouseTariffes } from "#app/warehouses/warehouse.js";

const URL = "https://common-api.wildberries.ru/api/v1/tariffs/box";

export const getWbTariffes = async (apiKey: string): Promise<WBWarehouseTariffes> => {
    const currentData = new Date();

    // TODO
    const finalUrl = `${URL}?date=${currentData.getFullYear()}-${currentData.getMonth() + 1}-${currentData.getDate()}`;

    const res = await fetch(finalUrl, {
        method: "GET",
        headers: {
            "Authorization": apiKey,
        },
    });

    console.log(`[INFO]: Request for get warehouses tariffes was sended! \n URL: ${finalUrl}, responseStatus: ${res.statusText}`);

    if (!res.ok) {
        throw new Error("Request for get tariffes failed!");
    }

    return res.json();
};
