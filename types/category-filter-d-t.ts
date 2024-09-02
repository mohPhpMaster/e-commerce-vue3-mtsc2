export interface ICategoryFilter {
    ITYPE: 'category-filter';
    id: number;
    slug?: string;
    name: string;
    products: number;
}

