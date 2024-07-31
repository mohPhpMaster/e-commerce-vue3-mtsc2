import a from 'axios';
import swal from "sweetalert";

const JSON_MODE = true;

const axios = a.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'language': 'en',
        'Accept': 'application/json',
    },
});

export default axios;

export const getProducts = (query = {}) => axios.get("products", query)
    .then(({data}) => {
        let products = data?.data || [];
        try {
            products = products && Array.isArray(products) ? products : Object.values(products);
        } catch (error) {
            products = [];
            console.error(error);
        }

        return products || data;
    })
    .catch(err => console.error(err));

export const getRelatedProducts = function (id) {
    const request = JSON_MODE ? Promise.resolve(require("/api/product_relateds.json")) : axios.get(`products/${id}/related`);

    return request
        .then(({data}) => {
            let response = data || [];
            try {
                response = response && Array.isArray(response) ? response : Object.values(response);
            } catch (error) {
                response = [];
                console.error(error);
            }

            return response || data;
        })
        .catch(err => console.error(err));
};

export const getSimilarProducts = function (id) {
    const request = JSON_MODE ? Promise.resolve(require("/api/similar_products.json")) : axios.get(`products/${id}/similar`);

    return request
        .then(({data}) => {
            let response = data || [];
            try {
                response = response && Array.isArray(response) ? response : Object.values(response);
            } catch (error) {
                response = [];
                console.error(error);
            }

            return response || data;
        })
        .catch(err => console.error(err));
};

export const getProductReviews = function (id) {
    const request = JSON_MODE ? Promise.resolve(require("/api/product_reviews.json")) : axios.get(`products/${id}/reviews`);

    return request
        .then(({data}) => {
            let response = data || [];
            try {
                response = response && Array.isArray(response) ? response : Object.values(response);
            } catch (error) {
                response = [];
                console.error(error);
            }

            return response || data;
        })
        .catch(err => console.error(err));
};

export const addProductReview = function (id, data = {}) {
    let l,
        $JSON_MODE = ((l = arguments[arguments.length - 1]) && typeof l === 'string' && l === 'JSON_MODE') ? !JSON_MODE : JSON_MODE;
    let request = !$JSON_MODE ?
        Promise.resolve(require("/api/success.json")) :
        axios
            .post(`products/${id}/reviews`, data);

    if (!$JSON_MODE) {
        request = request.then((response) => ({
            ...response,
            data: {
                id: 1,
                user: "test",
                date: "2021-05-16 21:30:00 am",
                ...data
            }
        }));
    }

    return request
        .then((response) => {
            // todo: complete receiving response
            console.error(89, {response})
            if (response?.status === "success") {
                swal({
                    text: response?.message || "تمت اضافة المراجعة بنجاح",
                    icon: "success"
                });
            } else {
                swal({
                    text: response?.message || "حصل خطا غير متوقع!",
                    icon: "error",
                    closeOnClickOutside: false,
                });
            }

            return response?.data;
        });
};

export const addProductToCart = function (id, qty = 1) {
    let l,
        $JSON_MODE = ((l = arguments[arguments.length - 1]) && typeof l === 'string' && l === 'JSON_MODE') ? !JSON_MODE : JSON_MODE;
    let request = !$JSON_MODE ?
        Promise.resolve(require("/api/success.json")) :
        axios.post(`cart`, {id, qty});

    if (!$JSON_MODE) {
        request = request.then((response) => ({
            ...response,
            data: {id}
        }));
    }

    return request
        .then((response) => {
            // todo: complete receiving response
            console.error(143, {response})
            if (response?.status === "success") {
                swal({
                    text: response?.message || "تمت اضافة المنتج بنجاح",
                    icon: "success"
                });
            } else {
                swal({
                    text: response?.message || "حصل خطا غير متوقع!",
                    icon: "error",
                    closeOnClickOutside: false,
                });
            }

            return response?.data;
        })
        .catch((error) => {
            console.error(error)
            swal({
                text: "حصل خطا غير متوقع!",
                icon: "error",
                closeOnClickOutside: false,
            });
        });
};

export const removeProductFromCart = function (id) {
    let l,
        $JSON_MODE = ((l = arguments[arguments.length - 1]) && typeof l === 'string' && l === 'JSON_MODE') ? !JSON_MODE : JSON_MODE;
    let request = !$JSON_MODE ?
        Promise.resolve(require("/api/success.json")) :
        axios.delete(`carts/${id}`);

    if (!$JSON_MODE) {
        // request = request.then((response) => ({
        //     ...response,
        //     data: {id}
        // }));
    }

    return request
};

export const addProductToWishlist = function (id) {
    let l,
        $JSON_MODE = ((l = arguments[arguments.length - 1]) && typeof l === 'string' && l === 'JSON_MODE') ? !JSON_MODE : JSON_MODE;
    let request = !$JSON_MODE ?
        Promise.resolve(require("/api/success.json")) :
        axios.post(`wishlist`, {id});

    if (!$JSON_MODE) {
        request = request.then((response) => ({
            ...response,
            data: {id}
        }));
    }

    return request
        .then((response) => {
            // todo: complete receiving response
            console.error(163, {response})
            if (response?.status === "success") {
                swal({
                    text: response?.message || "تمت اضافة المنتج بنجاح",
                    icon: "success"
                });
            } else {
                swal({
                    text: response?.message || "حصل خطا غير متوقع!",
                    icon: "error",
                    closeOnClickOutside: false,
                });
            }

            return response?.data;
        })
        .catch((error) => {
            console.error(error)
            swal({
                text: "حصل خطا غير متوقع!",
                icon: "error",
                closeOnClickOutside: false,
            });
        });
};
export const removeProductFromWishlist = function (id) {
    let l,
        $JSON_MODE = ((l = arguments[arguments.length - 1]) && typeof l === 'string' && l === 'JSON_MODE') ? !JSON_MODE : JSON_MODE;
    let request = !$JSON_MODE ?
        Promise.resolve(require("/api/success.json")) :
        axios.delete(`wishlist/${id}`);

    if (!$JSON_MODE) {
        // request = request.then((response) => ({
        //     ...response,
        //     data: {id}
        // }));
    }

    return request
};

export const triggerSiteSearch = (searchText) => {
    return axios.post('search', {search: this.searchText})
        .then(res => {

        })
};