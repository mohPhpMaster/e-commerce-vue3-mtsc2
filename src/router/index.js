import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import AddCategory from "../views/Category/AddCategory";
import Category from "../views/Category/Category";
// import EditCategory from "../views/Category/EditCategory";
// import AddProduct from "../views/Product/AddProduct";
// import Product from "../views/Product/Product";
// import EditProduct from "../views/Product/EditProduct";
import ShowProduct from "../views/Product/ShowProduct";
import Signup from "../views/Signup";
import Signin from "../views/Signin";
import WishList from "../views/Product/WishList";
import Cart from "../views/cart/Cart";
import Success from "../views/payment/Success";
import Failed from "../views/payment/Failed";
import Checkout from "../views/Checkout/Checkout";
import OrderHistory from "../views/order/OrderHistory";
import OrderDetails from "../views/order/OrderDetails";
import ShowBrand from "@/views/Brand/ShowBrand.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path : '/product/:id',
    name : 'ShowProduct',
    component: ShowProduct,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/category/:id",
    name: "ShowCategory",
    component: Category,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/brand/:id",
    name: "ShowBrand",
    component: ShowBrand,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/wishlist',
    name: 'WishList',
    component: WishList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path : '/cart',
    name : 'Cart',
    component : Cart,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component:Success
  },
  {
    path: '/payment/failed',
    name: 'FailedPayment',
    component:Failed
  },
  {
    path : '/checkout',
    name : 'Checkout',
    component : Checkout,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/orders',
    name: 'OrderHistory',
    component: OrderHistory,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:'/order/:id',
    name:'OrderDetails',
    component: OrderDetails,
    meta: {
      requiresAuth: true,
    },
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  window.scroll({behavior: "smooth", top: 0, left: 0});
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({
        name: "Signin",
      });
      return;
    }
  }

  next();
});

export default router
