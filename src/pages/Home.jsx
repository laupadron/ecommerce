import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getProductThunk, filterProductThunk, filterHeadlineThunk,filterPrice} from '../store/slices/products.slice'
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
 // console.log(products)
 // estado para mostrar las categorias
 const [categorys,setCategorys]=useState([]);
 const [inputSearch, setInputSearch] = useState("");
 //estado para filtrado por precios
 const [fromPrice,setFromPrice]=useState("");
 const[toPrice,setToPrice]= useState('');
 

 useEffect(()=>{
  dispatch(getProductThunk())

  axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
  .then(res=>setCategorys(res.data.data.categories))
 },[])


 return (
  <div >
   
   {/* INPUT BUSQUEDA NOMBRE */}
   <div className='inputs'>
    
    <div className='input-one'>
    <InputGroup className="mb-3">
     
      <Form.Control
          placeholder="Insert Brand"
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
    <Col lg={2} sm={12}>
     {/* INPUT BUSQUEDA PRECIO */}
   
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
    <Form className='form-filter'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>From Price</Form.Label>
        <Form.Control type="number" value={fromPrice}
          onChange={(e)=>setFromPrice(e.target.value)} />
        
      </Form.Group> 

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>To Price</Form.Label>
        <Form.Control type="number" value={toPrice}
          onChange={(e)=>setToPrice(e.target.value)} />
      </Form.Group>
     
      <Button variant="primary" onClick={()=>dispatch(filterPrice({fromPrice,toPrice}))}className='btn-filter'>
        Submit
      </Button>
     </Form>
    
    
    </Col>
    <Col lg={10} sm={0}>
    {/* PRODUCTOS */}
     <div className='container-prod'>
      {products?.map(product=>(
    
      <ul key={product.id} >
     
       <Link to={`/product/${product.id}`} >
       
        <li>
         <div className='image1'>
         <img src={product.productImgs[2]} style={{width:'150px', height:'150px',backgroundColor:'transparent',objectFit:'fill'}}  />
          <div className="imag2">
           
           <img src={product.productImgs[0]} style={{width:'150px', height:'150px',backgroundColor:'transparent',objectFit:'fill'}}className='over' />          
          </div>
          
          
         </div>
         
        </li>
        <div className="product-info">
         <li>{product.title}</li>
         <li className='price'>Price</li>
         <div className='btn-info'>
          <li>$ {product.price}</li>
          <button><i class="fa-solid fa-eye"></i></button>
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