import type {IMenuItem} from "@/types/menu-d-t";
import type {IMenuResponse} from "@/types/menu-response-d-t";
import {$axios} from "@/plugins/axiosInstance";

export async function menuData(prepend: IMenuItem[] = [], append: IMenuItem[] = []): Promise<IMenuItem[]> {
    try {
        const response: { data: { data: IMenuResponse[] } } = await $axios.get('menu');
        const menu = response?.data?.data || [];
        const transformedMenu: IMenuItem[] = menu.map(convertResponse);
        return [...prepend/*, ...transformedMenu*/, ...append];
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return [];
    }
}

function convertResponse(menu: IMenuResponse): IMenuItem {
    return menu;
}

export default menuData;