import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getProductThunk, filterProductThunk, filterHeadlineThunk} from '../store/slices/products.slice'
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';


const Home = () => {
 const dispatch=useDispatch();
 const products=useSelector(state=>state.products)
 // estado para mostrar las categorias
 const [categorys,setCategorys]=useState([]);
 const [inputSearch, setInputSearch] = useState("");
 

 useEffect(()=>{
  dispatch(getProductThunk())

  axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
  .then(res=>setCategorys(res.data.data.categories))
 },[])
 
 return (
  <div >
   {/* INPUT BUSQUEDA */}
   <div className='inputs'>
    <div className='input-one'>
    <InputGroup className="mb-3">
     
      <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          className='form-control'
          value={inputSearch}
          onChange={(e)=>setInputSearch(e.target.value)}
        />
         <Button variant="outline-secondary" 
          onClick={()=>dispatch(filterHeadlineThunk(inputSearch))}>
          Button
         </Button>
     
        
      </InputGroup>
    </div>
   <Row>
    <Col lg={2}>
     {/* BOTONES FILTRADO POR PROD */}
    <ListGroup>
    <div className='input-two'>
    {categorys.map((item)=>(
      <div key={item.id}>
      <ListGroup.Item onClick={()=>dispatch(filterProductThunk(item.id))}
      style={{cursor:'pointer'}}>
      {item.name}
      </ListGroup.Item>
      </div>
     ))
    }
     </div>
    
    </ListGroup>
    
    
    </Col>
    <Col lg={10}>
    {/* PRODUCTOS */}
     <div className='container-prod'>
      {products?.map(product=>(
    
      <ul key={product.id} >
     
       <Link to={`/product/${product.id}`} >
       
        <li>
         <div className='image1'>
         <img src={product.productImgs[0]} style={{width:'150px', height:'150px'}}className='principal' />
          <div className="imag2">
           <img src={product.productImgs[2]} style={{width:'150px', height:'150px'}} className='over' />
          </div>
          
          
         </div>
         
        </li>
        <div className="product-info">
         <li>{product.title}</li>
         <li className='price'>Price</li>
         <div className='btn-info'>
          <li>$ {product.price}</li>
          <button><i class="fa-solid fa-cart-plus"></i></button>
         </div>
        </div>
       
       </Link>
      </ul>
    
   
   ))}
   </div>
    </Col>
   </Row>
   
    
   
  
   </div>
    
  
  </div>
 );
};

export default Home;<h1>Home</h1>