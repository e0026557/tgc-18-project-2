import React from 'react';
import axios from 'axios';
import Login from './../components/Login';
import RecipeCard from './../components/RecipeCard';
import Pagination from 'react-bootstrap/Pagination';
import LoadingSpinner from './../components/LoadingSpinner';
import validateEmail from './../utilities/validateEmail';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default class Favorites extends React.Component {
	// --- State ---
	state = {
		activeSubPage: 'email',
		login: false,
		email: '',
		emailError: false,
		favoriteRecipes: [],
		contentLoaded: false,
		pages: 1,
		activePageNumber: 1
	};

	// --- Functions ---
	setActiveSubPage = (subPage) => {
		this.setState({
			activeSubPage: subPage
		});
	};

	setActivePageNumber = (activePageNumber) => {
		this.setState({
			activePageNumber: activePageNumber,
			contentLoaded: false
		});
	};

	updateFormField = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	login = () => {
		if (validateEmail(this.state.email)) {
			this.setState({
				login: true,
				emailError: false,
				activeSubPage: 'favorites'
			});
		} else {
			this.setState({
				emailError: true
			});
		}
	};

	// renderErrorMessage = () => {
	// 	if (this.state.emailError) {
	// 		return (
	// 			<span className='errorMessage mt-1 ms-1'>
	// 				Invalid email address
	// 			</span>
	// 		);
	// 	}
	// };

	getFavoriteRecipes = async () => {
		// Load favorite recipes upon successful login
		if (this.state.login) {
			let activePageNumber = this.state.activePageNumber;
			let response = await axios.get(
				BASE_API_URL +
					'favorites/' +
					this.state.email +
					`?page=${activePageNumber}}`
			);
			let favoriteRecipes = response.data.data.result || []; // Set default to empty array if no results retrieved
			let totalPages = response.data.data.pages;

			// Update state
			this.setState({
				favoriteRecipes: favoriteRecipes,
				pages: totalPages,
				contentLoaded: true
			});
		}
	};

	renderFavoriteRecipes = (recipes) => {
		if (recipes.length > 0) {
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
		} else {
			return (
				<div className='container ms-3'>
					<h3>No results to show</h3>
				</div>
			);
		}
	};

	renderPagination = () => {
		let activePageNumber = this.state.activePageNumber;
		let items = [];
		for (let pageNumber = 1; pageNumber <= this.state.pages; pageNumber++) {
			items.push(
				<Pagination.Item
					key={pageNumber}
					active={pageNumber === activePageNumber}
					onClick={async () => {
						await this.setActivePageNumber(pageNumber);
						this.getFavoriteRecipes();
					}}
				>
					{pageNumber}
				</Pagination.Item>
			);
		}

		// Return pagination when there are results
		if (this.state.favoriteRecipes.length > 0) {
			return (
				<div className='container-fluid d-flex justify-content-center align-items-center mt-5 mb-3'>
					<Pagination size='sm'>{items}</Pagination>
				</div>
			);
		}
		return '';
	};

	renderActiveSubPage = () => {
		const activeSubPage = this.state.activeSubPage;
		if (activeSubPage === 'email') {
			// Return email form component
			return (
				<Login
					email={this.state.email}
					emailError={this.state.emailError}
					updateFormField={this.updateFormField}
					login={this.login}
				/>
			);
		} else if (activeSubPage === 'favorites') {
			// Return favorited recipes
			return (
				<div className='container row d-flex justify-content-center align-items-stretch mt-4 mt-md-5'>
					{this.state.contentLoaded ? (
						<React.Fragment>
							<h2 className='ms-2 me-auto'>Favorites</h2>
							{/* Favorite recipes */}
							{this.renderFavoriteRecipes(
								this.state.favoriteRecipes
							)}
							{/* Pagination Component */}
							{this.renderPagination()}
						</React.Fragment>
					) : (
						<LoadingSpinner />
					)}
				</div>
			);
		}
	};

	render() {
		this.getFavoriteRecipes();
		return (
			<React.Fragment>
				{/* Email Form Input */}
				<section className='container-fluid d-flex flex-column justify-content-center align-items-center adjust-margin-top'>
					{/* <div className='email-box mt-5 d-flex flex-column justify-content-center align-items-center'>
						<h3>Enter email to proceed</h3>
						<div className='mt-3'>
							<Form.Control
								name='email'
								type='email'
								placeholder='Enter email'
								value={this.state.email}
								onChange={this.updateFormField}
							/>
							{this.renderErrorMessage()}
						</div>
						<Button
							className='btn-custom-primary mt-4'
							variant='primary'
							type='submit'
							onClick={this.login}
						>
							Retrieve
						</Button>
					</div> */}

					{this.renderActiveSubPage()}
				</section>

				{/* Favorited Recipes */}
				{/* <div className='row d-flex justify-content-center align-items-stretch mt-5'>
					{this.state.contentLoaded ? (
						<React.Fragment>
							{this.renderFavoriteRecipes(
								this.state.favoriteRecipes
							)}
							{this.renderPagination()}
						</React.Fragment>
					) : (
						<LoadingSpinner />
					)}
				</div> */}
			</React.Fragment>
		);
	}
}
