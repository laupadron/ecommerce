import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import SideBarCart from './SideBarCart';

const NavBar = () => {
 const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 return (
  <div className='navBar'>
    
      <Navbar bg="light" variant="light" className='general-nav'>
        <Container className='container-nav'>
          <Navbar.Brand as={Link} to='/' className='rigth'>e-commerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/loguin'><i className="fa-regular fa-user"></i></Nav.Link>
            <Nav.Link as={Link} to='/purchases'><i className="fa-solid fa-store"></i></Nav.Link>
            <Nav.Link as={Link} to='/' href="#pricing" onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <SideBarCart show={show} handleClose={handleClose}/>
    
  </div>
 );
};

export default NavBar;