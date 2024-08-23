
export interface IProductAccessoriesGroups {
    ITYPE: 'product-accessories-groups';
    id: string|number;
    name: string;
    is_required: string|number|boolean;
    group_id: string|number;
    group: string;
    qty: string|number;
    price: string|number;
    discount: string|number;
    net: number;
}