import React from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Create from './pages/Create';
import Favorites from './pages/Favorites';

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

	renderActivePage = () => {
		const activePage = this.state.activePage;
		if (activePage === 'home') {
			return (
				<Home />
			)
		}
		else if (activePage === 'recipes') {
			return (
				<Recipes />
			)
		}
		else if (activePage === 'create') {
			return (
				<Create />
			)
		}
		else if (activePage === 'favorites') {
			return (
				<Favorites />
			)
		}
	}

	render() {
		return (
			<React.Fragment>
				{/* Navbar */}
				<Navigation activePage={this.state.activePage} setActivePage={this.setActivePage} />

				{/* Page Content */}
				{this.renderActivePage()}
				
			</React.Fragment>
		);
	}
}
