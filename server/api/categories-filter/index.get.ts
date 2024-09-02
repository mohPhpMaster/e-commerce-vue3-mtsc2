import fs from 'node:fs'
import {sendStream} from 'h3'

export default defineEventHandler((event) => {
    const defaultPathToJson = `./server/api/categories-filter/default.json`

    return sendStream(event, fs.createReadStream(defaultPathToJson))
})
