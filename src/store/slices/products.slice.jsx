import { createSlice } from '@reduxjs/toolkit';
import {setIsLoading} from './isLoading.slice';
import axios from "axios";

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
     setProducts:(state,action)=>{
      return action.payload
     },
     filterPrice:(state,action)=>{
      const{fromPrice,toPrice}=action.payload;
      return state.filter(product=>product.price > Number(fromPrice) && product.price < Number(toPrice))
     }
    }
})
export const getProductThunk=()=> (dispatch) =>{
 dispatch(setIsLoading(true));
 axios.get('https://e-commerce-api.academlo.tech/api/v1/products')
 .then((res)=>dispatch(setProducts(res.data.data.products)))
 .finally(()=>dispatch(setIsLoading(false)))

}
export const filterProductThunk=(id)=> (dispatch) =>{
 dispatch(setIsLoading(true));
 axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
 .then((res)=>dispatch(setProducts(res.data.data.products)))
 .finally(()=>dispatch(setIsLoading(false)))

}
export const filterHeadlineThunk=(inputSearch)=> (dispatch) =>{
 dispatch(setIsLoading(true));
 axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`)
 .then((res)=>dispatch(setProducts(res.data.data.products)))
 .finally(()=>dispatch(setIsLoading(false)))

}

export const { setProducts,filterPrice } = productsSlice.actions;

export default productsSlice.reducer;
