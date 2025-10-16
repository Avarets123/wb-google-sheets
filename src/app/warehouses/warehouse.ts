export type WarehouseTariffType = {
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
    geoName: string;
    warehouseName: string;
};

export type WarehouseTariffSchemaType = {
    id: string;
    warehouse: string;
    warehouse_data: WarehouseTariffType
    created_at: Date;
};

export type WBWarehouseTariffes = {
    response: {
        data: {
            warehouseList: WarehouseTariffType[];
        };
    };
};
