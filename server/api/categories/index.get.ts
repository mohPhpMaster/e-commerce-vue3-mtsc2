import fs from 'node:fs'
import {sendStream} from 'h3'

export default defineEventHandler((event) => {
    const defaultPathToJson = `./server/api/categories/categories.json`

    return sendStream(event, fs.createReadStream(defaultPathToJson))
})
