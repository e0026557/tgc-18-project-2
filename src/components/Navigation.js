import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

export default function Navigation(props) {
  return (
    <Navbar className='navbar' fixed='top' bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand
          className='ms-3'
          href='#home'
          onClick={() => {
            props.setActivePage('home');
          }}
        >
          <img
            className='logo-img'
            src={require('./../assets/images/logo/coffeetalk.png')}
            alt='CoffeeTalk Logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className='me-3'
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link
              className={
                props.activePage === 'home' ? 'active' : ''
              }
              href='#home'
              onClick={() => {
                props.setActivePage('home');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className={
                props.activePage === 'recipes' ? 'active' : ''
              }
              href='#recipes'
              onClick={() => {
                props.setActivePage('recipes');
              }}
            >
              Recipes
            </Nav.Link>
            <Nav.Link
              className={
                props.activePage === 'create' ? 'active' : ''
              }
              href='#create'
              onClick={() => {
                props.setActivePage('create');
              }}
            >
              Create
            </Nav.Link>
            <Nav.Link
              className={
                props.activePage === 'favorites' ? 'active' : ''
              }
              href='#favorites'
              onClick={() => {
                props.setActivePage('favorites');
              }}
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
