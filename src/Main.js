import React from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Create from './pages/Create';
import Favorites from './pages/Favorites';
import Recipe from './pages/Recipe';
import Edit from './pages/Edit';

// import { Nav, Navbar, Container } from 'react-bootstrap';

export default class Main extends React.Component {
	state = {
		activePage: 'home', // 'home', 'recipes', 'create', 'favorites', 'edit' and 'recipe' (To display individual recipe)
		activeRecipe: ''
	};

	// --- Functions ---
	setActivePage = (page, recipeId) => {
		if (recipeId) {
			this.setState({
				activePage: page,
				activeRecipe: recipeId
			})
		}
		else {
			this.setState({
				activePage: page
			});
		}
	};

	renderActivePage = () => {
		const activePage = this.state.activePage;
		if (activePage === 'home') {
			return (
				<Home setActivePage={this.setActivePage} />
			)
		}
		else if (activePage === 'recipes') {
			return (
				<Recipes setActivePage={this.setActivePage} />
			)
		}
		else if (activePage === 'create') {
			return (
				<Create setActivePage={this.setActivePage} />
			)
		}
		else if (activePage === 'favorites') {
			return (
				<Favorites setActivePage={this.setActivePage} />
			)
		}
		else if (activePage === 'recipe') {
			return (
				<Recipe activeRecipe={this.state.activeRecipe} setActivePage={this.setActivePage} />
			)
		}
		else if (activePage === 'edit') {
			return (
				<Edit activeRecipe={this.state.activeRecipe} setActivePage={this.setActivePage} />
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
