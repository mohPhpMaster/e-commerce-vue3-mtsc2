import type {IMenuItem} from '@/types/menu-d-t';
import {api} from "@/plugins/api";

async function getMenuData() {
    const menu_data = await api.menuData([
        {
            ITYPE: 'static-menu',
            id: 0,
            link: '/',
            title: 'Home',
        },
        {
            ITYPE: 'static-menu',
            id: 100,
            link: '/indexold',
            title: 'indexold',
        },
        {
            ITYPE: 'static-menu',
            id: 2,
            link: '/shop',
            title: 'Shop',
            drop_down: true,
            dropdown_menus: [
                {title: 'Shop', link: '/shop'},
                {title: 'Shop Details', link: '/product-details'},
                {title: 'Shop Category', link: '/shop-categories'},
                {title: 'Cart', link: '/cart'},
                {title: 'Wishlist', link: '/wishlist'},
                {title: 'Compare', link: '/compare'},
            ],
        },
        {
            ITYPE: 'static-menu',
            id: 3,
            link: '/about',
            title: 'Pages',
            drop_down: true,
            dropdown_menus: [
                {title: 'About', link: '/about'},
                {title: 'Login', link: '/login'},
                {title: 'Register', link: '/register'},
                {title: 'Forgot', link: '/forgot'},
                {title: 'Profile', link: '/profile'},
                {title: 'Invoice', link: '/invoice'},
                {title: 'Order', link: '/order'},
                {title: 'Checkout', link: '/checkout'},
            ],
        },
        {
            ITYPE: 'static-menu',
            id: 4,
            link: '/coupons',
            title: 'Coupons',
        },
        {
            ITYPE: 'static-menu',
            id: 5,
            link: '/blog',
            title: 'Blog',
            drop_down: true,
            dropdown_menus: [
                {title: 'Blog Standard', link: '/blog'},
                {title: 'Blog Details', link: '/blog-details'},
            ],
        },
        {
            ITYPE: 'static-menu',
            id: 6,
            link: '/contact',
            title: 'Contact',
        },
    ]);
    // menu_data = menu_data.splice(0,1);
    // console.log(62, menu_data)
    return menu_data;
}

export default getMenuData;