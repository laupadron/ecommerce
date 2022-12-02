import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductThunk } from '../store/slices/products.slice'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { Col, Row } from 'react-bootstrap';
import { createCartThunk } from '../store/slices/cart.slice';


const ProductsDetails = () => {
 const { id } = useParams();
 const dispatch = useDispatch();
 const [quantity, setQuantity] = useState(null)

 useEffect(() => {
  dispatch(getProductThunk())
 }, [])

 const newProducts = useSelector(state => state.products)
 // traigo los productos
 const products = newProducts.find((newItem) => newItem.id === Number(id))
 console.log(products)
 // encuentro productos relacionados
 const relatedProducts = newProducts.filter((item) => item?.category?.id === products?.category?.id)
 console.log(relatedProducts)
 // F para aumentar quantity button
 const sumProduct = () => {
  setQuantity(quantity + 1)
 }
 // F para restar quantity button
 const restProduct = () => {
  setQuantity(quantity - 1)
 }
 const addToCart = () => {
  const product = {
    id: products.id,
    quantity: quantity
  };
  console.log(product)
  dispatch(createCartThunk(product))
};



 return (
  <>
   <div className="select-prod">
    <p>Home <li>{products?.title}</li></p>
   </div>
   <Row>
    <Col lg>
     <Carousel>
      <Carousel.Item key='products.id'>
       <img
        className="d-block w-100"
        src={products?.productImgs[0]}
        alt="First slide"
        style={{ height: '450px', backgroundColor:'transparent' }}
       />

      </Carousel.Item>
      <Carousel.Item key='products.id'>
       <img
        className="d-block w-100"
        src={products?.productImgs[1]}
        alt="Second slide"
        style={{ height: '450px',backgroundColor:'transparent' }}
       />


      </Carousel.Item>
      <Carousel.Item key='products.id'>
       <img
        className="d-block w-100"
        src={products?.productImgs[2]}
        alt="Third slide"
        style={{ height: '450px',backgroundColor:'transparent' }}
       />
      </Carousel.Item>
     </Carousel>
    </Col>
    <Col lg>
     <div className="info">
      <h4>{products?.title}</h4>
      <p>{products?.description}</p>
      <div className="price-contain">
       <div className="price-item">
        <p>price</p>
        <h4>${products?.price}</h4>
       </div>
       <div className="quantity">
        <p>Quantity</p>
        <div className="btn">
         <button onClick={restProduct}>-</button>
         <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
         <button onClick={sumProduct}>+</button>
         
        </div>
        
       </div>
       
      </div>
      <button onClick={addToCart} className='add'>Add to Cart</button>
     </div>
    </Col>
   </Row>



   <div className='related'>
    <h3>Discover similar items</h3>
    <div className="container-similar">
     {relatedProducts.map(item => (
      <>
       <Link to={`/product/${item.id}`}>
        <div className="container-details" key={item.id}>
         <img src={item?.productImgs[0]} alt="" style={{ width: '150px', height: '150px' }} />
         <li>
          {item?.title}
          <li className='title-price'>Price</li>
          <li >
           <div className="price" >
            ${item.price}
            <button><i class="fa-solid fa-eye"></i></button>
            
           </div>
          </li>

         </li>
        </div>
       </Link>
      </>
     ))}
    </div>

   </div>
  </>
 );
};

export default ProductsDetails;