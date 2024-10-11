export interface IUserAddresses {
    id: number,
    label: string,
    ship_to_location?: string
    bill_to_location?: string
    country_id?: string,
    country_name?: string,
    governorate_id?: number,
    governorate_name?: string,
    city_id?: number,
    city_name?: string,
    nighbourhood_id?: number,
    nighbourhood_name?: string,
    address: string,
    long: number|string|null,
    lat: number|string | null,
    is_default?: boolean
    postal_code?: string
}
