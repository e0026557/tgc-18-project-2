import React from 'react';
import axios from 'axios';
import RecipeCard from './../components/RecipeCard';
import LoadingSpinner from './../components/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default class Home extends React.Component {
	state = {
		latestRecipes: [],
		popularRecipes: [],
		contentLoaded: false
	};

	// --- Functions ---
	async componentDidMount() {
		// Loading JSON Files in parallel
		let latestRecipesRequest = axios.get(
			BASE_API_URL + 'recipes?sort=date&limit=3'
		);
		let popularRecipesRequest = axios.get(
			BASE_API_URL + 'recipes?sort=rating&limit=3'
		);

		let [latestRecipesResponse, popularRecipesResponse] = await axios.all([
			latestRecipesRequest,
			popularRecipesRequest
		]);

		this.setState({
			latestRecipes: latestRecipesResponse.data.data.result,
			popularRecipes: popularRecipesResponse.data.data.result,
			contentLoaded: true
		});
	}

	renderRecipes = (recipes) => {
		return recipes.map((recipe) => {
			return (
				<div
					className='col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-stretch'
					key={recipe._id}
				>
					<RecipeCard
						recipe={recipe}
						setActivePage={this.props.setActivePage}
					/>
				</div>
			);
		});
	};

	render() {
		return (
			<React.Fragment>
				{/* Hero Section */}
				<section className='section-hero adjust-margin-top'>
					<div className='hero-box'>
						<h1 className='hero-header'>CoffeeTalk</h1>
						<span className='hero-span'>
							Coffee-making made easier
						</span>
					</div>
					<FontAwesomeIcon icon={faChevronDown} />
				</section>

				{/* Latest 3 Recipes */}
				<section className='section-latest container mt-5'>
					<h2>What's New</h2>
					<div className='row d-flex justify-content-center align-items-stretch'>
						{this.state.contentLoaded ? (
							this.renderRecipes(this.state.latestRecipes)
						) : (
							<LoadingSpinner />
						)}
					</div>
				</section>

				{/* Top 3 Recipes */}
				<section className='section-popular container my-5'>
					<h2>What's Popular</h2>
					<div className='row d-flex justify-content-center align-items-stretch'>
						{this.state.contentLoaded ? (
							this.renderRecipes(this.state.popularRecipes)
						) : (
							<LoadingSpinner />
						)}
					</div>
				</section>
			</React.Fragment>
		);
	}
}
