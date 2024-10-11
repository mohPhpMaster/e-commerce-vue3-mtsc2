import type {IMenuItem} from "@/types/menu-d-t";
import type {IMenuResponse} from "@/types/menu-response-d-t";

export async function menuData({prepend = [], append = [], page = 1, slug = ''}: {
    prepend?: IMenuItem[],
    append?: IMenuItem[],
    page?: number,
    slug?: string
} = {}): Promise<IMenuItem[]> {
    try {
        const response: { data: { data: IMenuResponse[] } } = await $axios.get('menu');
        const menu = response?.data?.data || [];
        const transformedMenu: IMenuItem[] = menu.map(convertResponse);
        return [...prepend, ...transformedMenu, ...append];
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return [];
    }
}

function convertResponse(menu: IMenuResponse): IMenuItem {
    return menu;
}

export default menuData;