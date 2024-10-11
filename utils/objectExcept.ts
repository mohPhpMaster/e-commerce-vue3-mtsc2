type TObject = { [key: string]: any };

export function objectExcept(obj: TObject, except: string[]): TObject {
    const newObj: TObject = {...obj};
    try {
        except.forEach(key => {
            if (newObj.hasOwnProperty(key)) {
                delete newObj[key];
            }
        });
    } catch (e) {
        console.error(e);
    }

    return newObj;
}
