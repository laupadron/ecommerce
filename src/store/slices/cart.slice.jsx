import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';
import axios from 'axios';
export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
setCart:(state,action)=>{
 return action.payload
}
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.get('https://e-commerce-api.academlo.tech/api/v1/cart',getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const createCartThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', product,getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkOutThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases',{},getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteCartThunk = (id) => (dispatch) => {
 dispatch(setIsLoading(true));
  axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`,getConfig())
     .then(() => dispatch(getCartThunk()))
     .finally(() => dispatch(setIsLoading(false)));
}
export const updateCartThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.patch('https://e-commerce-api.academlo.tech/api/v1/cart',product,getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}


export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
