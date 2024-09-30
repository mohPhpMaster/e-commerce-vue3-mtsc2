export default (formData: { [key: string]: any }, keysMap: {
    [key: string]: string
} = {}, files: string[] = []): FormData => {
    const data = new FormData();

    for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            let keyName = keysMap?.[key] || key;
            if (files.includes(key)) {
                data.append(keyName, new Blob([formData[key]], {type: formData[key]?.type}), formData[key]?.name);
            } else if (!Object.values(keysMap).includes(keyName)) {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach((item, index) => {
                        data.append(`${keyName}[]`, item);
                    });
                } else {
                    data.append(keyName, formData[key]);
                }
            }
        }
    }

    return data;
}