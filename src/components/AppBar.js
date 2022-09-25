import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import image from '../logo/Logo.png';
import Container from 'react-bootstrap/Container';

function AppBar() {
  return (
    <>
        <Navbar className="navbar" bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={image} />
                </Navbar.Brand>
            </Container>
        </Navbar>
    </>
  )
}

export default AppBar