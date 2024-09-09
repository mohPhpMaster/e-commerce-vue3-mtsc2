export function arrayWrap(obj: any): array {
    return Array.isArray(obj) ? obj : [obj];
}
