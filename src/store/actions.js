import apiClient from '../utils/axios';

export const fetchProducts = async ({commit}) => {
    const response = await apiClient.get('/products');
    commit('SET_PRODUCTS', response.data);
};
