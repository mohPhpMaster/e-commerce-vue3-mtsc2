export interface IUserAddresses {
    id: number,
    label: string,
    ship_to_location?: string
    bill_to_location?: string
    country_id?: string,
    governorate_id?: number,
    city_id?: number,
    nighbourhood_id?: number,
    address: string,
    long: number|string,
    lat: number|string,
    is_default?: boolean
}
