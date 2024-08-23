export default (formData: { [key: string]: any }): FormData => {
    const data = new FormData();
    for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            data.append(key, formData[key]);
        }
    }

    return data;
}