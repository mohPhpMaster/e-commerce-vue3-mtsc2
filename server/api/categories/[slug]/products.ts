import fs from 'node:fs'
import {sendStream} from 'h3'
export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug')

    const defaultPathToJson = `./server/api/categories/[slug]/default.json`
    const pathToJson = `./server/api/categories/[slug]/${slug}.json`

    return sendStream(event, fs.createReadStream(
        fs.existsSync(pathToJson) ? pathToJson : defaultPathToJson
    ))
})