import fs from 'node:fs'
import {sendStream} from 'h3'

export default defineEventHandler(async (event) => {
    const data = Object.fromEntries(await readFormData(event))

    return {
        data,
        status: 'success',
        message: 'address added successfully'
    };
})
