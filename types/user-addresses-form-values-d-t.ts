export interface IUserAddressesFormValues {
    label?: string
    ship_to_location?: string
    bill_to_location?: string
    country_id?: string,
    governorate_id?: number,
    city_id?: number,
    nighbourhood_id?: number,
    address?: string
    lat?: number | string
    long?: number | string
    lat_long?: string
    is_default?: boolean
}