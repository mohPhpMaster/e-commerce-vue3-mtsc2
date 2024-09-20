export default defineEventHandler(async (event) => {
    const data = Object.fromEntries(await readFormData(event))

    return {
        data,
        status: 'success',
        message: 'address updated successfully'
    };
})
