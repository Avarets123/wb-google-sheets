import { runAfterAppStarted, runUpdateTariffesEveryMinutes } from "#app/warehouses/service.js";
import { migrate } from "#postgres/knex.js";
import http from "http";

const updateMinutes = process.env.WAREHOUSES_UPDATE_MINUTES || '1'

await migrate.latest();
console.log("[INFO]: All migrations and seeds have been run");
await runAfterAppStarted();
runUpdateTariffesEveryMinutes(+updateMinutes);
http.createServer().listen();
