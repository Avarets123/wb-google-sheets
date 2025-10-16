import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    keyFile: "./sh-api.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

export const updateSheetValuesWithClear = async (spreadsheetId: string, range: string, values: any[][]): Promise<void> => {
    await sheets.spreadsheets.values.clear({
        range,
        spreadsheetId,
    });

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        valueInputOption: "RAW",
        range,

        requestBody: {
            values,
        },
    });
};
