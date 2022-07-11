import React from 'react';
import Navigation from './Navigation';

// import { Nav, Navbar, Container } from 'react-bootstrap';

export default class Main extends React.Component {
	state = {
		activePage: 'home' // 'home', 'recipes', 'create', and 'favorites'
	};

	// --- Functions ---
	setActivePage = (page) => {
		this.setState({
			activePage: page
		});
	};

	render() {
		return (
			<React.Fragment>
				{/* Navbar */}
				<Navigation activePage={this.state.activePage} setActivePage={this.setActivePage} />

				{/* Hero Section */}
				<div className='section-hero'></div>

				{/* Latest 3 Recipes */}

				{/* Top 3 Recipes */}
			</React.Fragment>
		);
	}
}
