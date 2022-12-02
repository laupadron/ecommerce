import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import '../styles/purchases.css'
const Purchases = () => {
 const dispatch= useDispatch();
 const purchases= useSelector((state)=>state.purchases)
 console.log(purchases)
 
 
  
 useEffect(()=>{
 dispatch(getPurchasesThunk())
 },[])

 
 return (
  <div >
   <h1>My Purchases</h1>
   <ul className='general-purchases'>
    {purchases.map((purchase)=>(
     
     <li key={purchase.id}>
      {purchase.cart.products.map(product=>(
       <li>
        <Link to={`/product/${product?.id}`}>
         <div className="container-purchases">
         <h4><b>{product.createdAt.split(/-|T|:/).splice(0,3).reverse().join('/')}</b></h4>
        <div className="info-product">
         
         <p className='tittle'>{product.title}</p>
         <p className='quant'>{product.productsInCart.quantity}</p>
         <p className='price'>${product.price}</p>

        </div>
         </div>
        
        
        
        
        </Link>
       </li>
      ))}
     </li>
    ))}
   </ul>
  </div>
 );
};

export default Purchases;