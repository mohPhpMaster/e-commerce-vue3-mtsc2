export default (formData: { [key: string]: any }, keysMap: {
    [key: string]: string
} = {}, files: string[] = []): FormData => {
    const data = new FormData();

    for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            let keyName = keysMap?.[key] || key;
            const value = formData[key];
            if (files.includes(key)) {
                data.append(...(value ? [keyName, new Blob([value], {type: value?.type}), value?.name] : (value == null ? [keyName, undefined] : [keyName, value])));
            } else if (!Object.values(keysMap).includes(keyName)) {
                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (Array.isArray(item)) {
                            item.forEach((subItem, subIndex) => {
                                data.append(`${keyName}[${index}]`, subItem);
                            });
                        } else if (typeof item === 'object') {
                            for (const subKey in item) {
                                if (Object.prototype.hasOwnProperty.call(item, subKey)) {
                                    data.append(`${keyName}[${index}][${subKey}]`, item[subKey]);
                                }
                            }
                        } else {
                            data.append(`${keyName}[${index}]`, item);
                        }
                    });
                } else if (typeof value === 'object') {
                    for (const subKey in value) {
                        if (Object.prototype.hasOwnProperty.call(value, subKey)) {
                            data.append(`${keyName}[${subKey}]`, value[subKey]);
                        }
                    }
                } else {
                    data.append(keyName, value);
                }
            }
        }
    }

    return data;
}