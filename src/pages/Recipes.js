import React from 'react';
import axios from 'axios';
import RecipeCard from './../components/RecipeCard';
import LoadingSpinner from './../components/LoadingSpinner';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default class Recipes extends React.Component {
	// --- State ---
	state = {
		recipes: [],
    beans: [],
    grinders: [],
    brewers: [],
    methods: [],
		pages: 1,
		activePageNumber: 1,
		contentLoaded: false
	};

	// --- Functions ---
	async componentDidMount() {
		// Load all resources in parallel
		let recipeRequest = axios.get(BASE_API_URL + 'recipes');
		let beanRequest = axios.get(BASE_API_URL + 'beans');
		let grinderRequest = axios.get(BASE_API_URL + 'grinders');
		let brewerRequest = axios.get(BASE_API_URL + 'brewers');
		let methodRequest = axios.get(BASE_API_URL + 'methods');

		let [
			recipeResponse,
			beanResponse,
			grinderResponse,
			brewerResponse,
			methodResponse
		] = await axios.all([
			recipeRequest,
			beanRequest,
			grinderRequest,
			brewerRequest,
			methodRequest
		]);

    // Get recipes and pages
		let recipes = recipeResponse.data.data.result || []; // Set to empty array if no recipes in database
		let totalPages = recipeResponse.data.data.pages;

    // Get beans
    let beans = beanResponse.data.data.result || []; // Set to empty array if no beans in database

    // Get grinders
    let grinders = grinderResponse.data.data.result || []; // Set to empty array if no grinders in database

    // Get brewers
    let brewers = brewerResponse.data.data.result || []; // Set to empty array if no brewers in database

    // Get methods
    let methods = methodResponse.data.data.result || []; // Set to empty array if no methods in database

		// Update state
		this.setState({
			recipes: recipes,
      beans: beans,
      grinders: grinders,
      brewers: brewers,
      methods: methods,
			pages: totalPages,
			contentLoaded: true
		});
	}

	render() {
		return (
			<React.Fragment>
				<section className='adjust-margin-top'>Recipes</section>
			</React.Fragment>
		);
	}
}
