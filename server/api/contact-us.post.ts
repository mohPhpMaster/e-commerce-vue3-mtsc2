import {defineEventHandler} from 'h3';

export default defineEventHandler(async (event) => {
    const data = await readFormData(event)

    // Return a success message
    return {
        status: 'success',
        message: 'message sent successfully'
    };
});