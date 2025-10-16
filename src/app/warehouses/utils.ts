export const getWarehouseName = (geoName: string, warehouse: string): string => `${geoName}. ${warehouse}`;

export const runFnByInterval = async (fn: () => Promise<any>, minutes: number) => {
    setInterval(
        async () => {
            await fn();
        },
        minutes * 60 * 1000,
    );
};
