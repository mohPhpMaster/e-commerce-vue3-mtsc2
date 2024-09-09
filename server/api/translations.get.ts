import fs from "node:fs";

export default defineEventHandler(async (event) => {
    const query = getHeaders(event)
    const l = query?.language || query?.['Accept-Language'] || 'en';

    const defaultPathToJson = `./locales/${l}.json`
    return fs.promises.readFile(defaultPathToJson)
        .then(data => JSON.parse(data.toString()))
        .then(data => {
            return {
                data,
                locale: l
            };
        });
})
