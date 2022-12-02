import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartThunk, getCartThunk, updateCartThunk } from '../store/slices/cart.slice';
import { checkOutThunk } from '../store/slices/cart.slice';

const SideBarCart = ({ show, handleClose }) => {
 const dispatch = useDispatch();
 const cart = useSelector(state => state.cart)
 const [totalPrice,setTotalPrice]=useState(0)
 



 useEffect(() => {
  dispatch(getCartThunk())

 }, [])
// f para precio total
useEffect(()=>{
let sumPrice=0
cart.forEach((product)=>{
 sumPrice += product.price*product.productsInCart.quantity
})
setTotalPrice(sumPrice)
},[cart])



 const updateProduct = (product) => {
  const newProduct = {
   id: product.id,
   newQuantity: product.productsInCart.quantity - 1
  }
  dispatch(updateCartThunk(newProduct))
 }
 const upProduct = (product) => {
  const newProduct = {
   id: product.id,
   newQuantity: product.productsInCart.quantity + 1
  }
  dispatch(updateCartThunk(newProduct))
 }

 return (
  <div>
   <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
     <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
     {cart.map(product => (
      <>
       <div className="icon-cart">
        <p>{product.brand}</p>
        <button onClick={() => dispatch(deleteCartThunk(product.id)) }className='icon-cart'><i className="fa-regular fa-trash-can"  ></i></button>
       </div>
       <p>{product.title}</p>
       <div className="cart-amount">
        <p>Amount</p>
       <button onClick={() => updateProduct(product)}>-</button>
       <input type="number" value={product.productsInCart.quantity}  />
       <button onClick={() => upProduct(product)}>+</button>
       </div>
       
       <div className="total">
        <p>Total:</p>
        <p>${Number(product.price) * Number(product.productsInCart.quantity).toFixed(2)}</p>
       </div>
      
      </>
     ))}
     <div className="total-price">
      <p>Total Products</p>
      <p>${totalPrice}</p>
     </div>
     

     <Button className='btn-cart' onClick={() => dispatch(checkOutThunk())}> CheckOut</Button>

    </Offcanvas.Body>
   </Offcanvas>
  </div>
 );
};

export default SideBarCart;

