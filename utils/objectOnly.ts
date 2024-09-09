type TObject = { [key: string]: any };

export function objectOnly(obj: TObject, only: string[]): TObject {
    const newObj: TObject = {};
    try {
        only.forEach(key => {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        });
    } catch (e) {
        console.error(e);
    }

    return newObj;
}
