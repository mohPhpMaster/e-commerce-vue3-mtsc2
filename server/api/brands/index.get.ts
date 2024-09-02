import fs from 'node:fs'
import {sendStream} from 'h3'

export default defineEventHandler((event) => {
    const defaultPathToJson = `./server/api/brands/brands.json`

    return sendStream(event, fs.createReadStream(defaultPathToJson))
})
