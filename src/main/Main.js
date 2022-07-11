import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

export default function Main() {
	return (
		<React.Fragment>
			<Navbar className='navbar' fixed="top" bg='light' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>
						<img className='logo-img' src={require('./../assets/images/coffeetalk.png')} alt="CoffeeTalk Logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link href='#home'>Home</Nav.Link>
							<Nav.Link href='#recipes'>Recipes</Nav.Link>
							<Nav.Link href='#create'>Create</Nav.Link>
							<Nav.Link href='#favorites'>Favorites</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
      
      <div className='section-hero'></div>
		</React.Fragment>
	);
}
