import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import signUp from '../styles/signUp.css'

const Loguin = () => {
 const {register,handleSubmit}= useForm();
 const navigate = useNavigate();

 const submit=data=>{
  axios.post('https://e-commerce-api.academlo.tech/api/v1/users/login',data)
  .then(res=>{
   navigate('/');
   localStorage.setItem('token', res.data.data.token)
 }
  )
  .catch((error) =>{
   if (error.response?.status===404){
    alert('Credenciales Incorrectas')
   }else{
    console.log(error.response?.data)
   }
  })

 }
 return (
   <>
  <Form onSubmit={handleSubmit(submit)} style={{ maxWidth: 500, margin: "0 auto" }}>
   <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" {...register('email')} />
    
   </Form.Group>

   <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" {...register('password')} />
   </Form.Group>
   
   <Button variant="primary" type="submit" className='btn-loguin'>
    Submit
   </Button>
  </Form>
  <div className="sign-up">
  <p>Already have an account? </p>
  <Link to={'/signUp'} className='link'>Log in</Link>
 
  </div>
 
 
 </>
 )
};

export default Loguin;