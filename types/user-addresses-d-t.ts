export interface IUserAddresses {
    id: number,
    label: string,
    address: string,
    long: number|string,
    lat: number|string,
    is_default?: boolean
}
