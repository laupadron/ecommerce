import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {
 return (
  <div className='navBar'>
    
      <Navbar bg="light" variant="light" className='general-nav'>
        <Container className='container-nav'>
          <Navbar.Brand as={Link} to='/' className='rigth'>e-commerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/loguin'><i className="fa-regular fa-user"></i></Nav.Link>
            <Nav.Link as={Link} to='/purchases'><i className="fa-solid fa-store"></i></Nav.Link>
            <Nav.Link href="#pricing"><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
  </div>
 );
};

export default NavBar;