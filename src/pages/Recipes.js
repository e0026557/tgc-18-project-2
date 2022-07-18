import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import RecipeCard from './../components/RecipeCard';
import LoadingSpinner from './../components/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default class Recipes extends React.Component {
	// --- Constants ---
	value = true;

	// --- State ---
	state = {
		// Search/Filter criteria
		searchRecipeName: '',
		searchBeans: [], // Default to an empty array
		searchGrinder: '',
		searchMethod: '',
		searchBrewer: '',
		searchMinRating: '', // Default value
		searchSort: 'date', // Default sorting
		// Resources
		recipes: [],
		beans: [],
		grinders: [],
		brewers: [],
		methods: [],
		pages: 1,
		activePageNumber: 1,
		submitStatus: false,
		contentLoaded: false,
		// Modal
		fullscreen: true,
		show: false
	};

	// --- Functions ---
	async componentDidMount() {
		// Load all resources in parallel
		let recipeRequest = axios.get(
			BASE_API_URL + 'recipes' + `?page=${this.state.activePageNumber}`
		);
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
			activePageNumber: 1,
			contentLoaded: true
		});
	}

	async componentDidUpdate() {
		if (this.state.submitStatus) {
			// Build query string
			// Note: beans array must be converted to comma-separated string
			let queryString = `?name=${
				this.state.searchRecipeName
			}&beans=${this.state.searchBeans.join(',')}&grinder=${
				this.state.searchGrinder
			}&method=${this.state.searchMethod}&brewer=${
				this.state.searchBrewer
			}&rating=${this.state.searchMinRating}&sort=${
				this.state.searchSort
			}&page=${this.state.activePageNumber}`;

			let recipeResponse = await axios.get(
				BASE_API_URL + 'recipes' + queryString
			);

			// Get recipes and pages
			let recipes = recipeResponse.data.data.result || []; // Set to empty array if no recipes in database
			let totalPages = recipeResponse.data.data.pages;

			// Update state
			this.setState({
				recipes: recipes,
				pages: totalPages,
				contentLoaded: true,
				submitStatus: false
			});
		}
	}

	updateFormField = (event) => {
		// Check if input type is checkbox
		if (event.target.type !== 'checkbox') {
			this.setState({
				[event.target.name]: event.target.value
			});
		} else {
			// Uncheck checkbox if it is already checked
			if (this.state[event.target.name].includes(event.target.value)) {
				this.setState({
					[event.target.name]: this.state[event.target.name].filter(
						(element) => element !== event.target.value
					)
				});
			}
			// Check checkbox if it is not already checked
			else {
				this.setState({
					[event.target.name]: [
						...this.state[event.target.name],
						event.target.value
					]
				});
			}
		}
	};

	renderSearchForm = () => {
		return (
			<div>
				{/* Recipe name */}
				<Form.Group className='mt-3 mb-3'>
					<Form.Control
						type='text'
						placeholder='Search recipe name'
						name='searchRecipeName'
						value={this.state.searchRecipeName}
						onChange={this.updateFormField}
					/>
				</Form.Group>

				{/* Beans */}
				<Form.Group className='mb-3'>
					<Dropdown autoClose='outside'>
						<Dropdown.Toggle className='dropdown-light'>
							Select coffee bean(s)
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{this.state.beans.map((bean) => {
								return (
									<Dropdown.Item as='button' key={bean._id}>
										<label
											className={
												this.state.searchBeans.includes(
													bean._id
												)
													? 'w-100 py-1 dropdown-selected'
													: 'w-100 py-1'
											}
										>
											<input
												type='checkbox'
												className='mx-2'
												name='searchBeans'
												value={bean._id}
												onChange={this.updateFormField}
												checked={this.state.searchBeans.includes(
													bean._id
												)}
											/>
											{bean.name}
										</label>
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Form.Group>

				{/* Grinder */}
				<Form.Group className='mb-3'>
					<Form.Select
						name='searchGrinder'
						value={this.state.searchGrinder}
						onChange={this.updateFormField}
					>
						<option value='' disabled>
							--- Select grinder ---{' '}
						</option>
						{this.state.grinders.map((grinder) => {
							return (
								<option key={grinder._id} value={grinder._id}>
									{grinder.brand} {grinder.model}
								</option>
							);
						})}
					</Form.Select>
				</Form.Group>

				{/* Method */}
				<Form.Group className='mb-3'>
					<Form.Select
						name='searchMethod'
						value={this.state.searchMethod}
						onChange={this.updateFormField}
					>
						<option value='' disabled>
							--- Select brew method ---
						</option>
						{this.state.methods.map((method) => {
							return (
								<option key={method._id} value={method._id}>
									{method.name}
								</option>
							);
						})}
					</Form.Select>
				</Form.Group>

				{/* Brewer */}
				<Form.Group className='mb-3'>
					<Form.Select
						name='searchBrewer'
						value={this.state.searchBrewer}
						onChange={this.updateFormField}
					>
						<option value='' disabled>
							--- Select brewer ---{' '}
						</option>
						{this.state.brewers.map((brewer) => {
							return (
								<option key={brewer._id} value={brewer._id}>
									{brewer.brand} {brewer.model}
								</option>
							);
						})}
					</Form.Select>
				</Form.Group>

				{/* Min rating */}
				<Form.Group className='mb-3'>
					<Form.Select
						name='searchMinRating'
						value={this.state.searchMinRating}
						onChange={this.updateFormField}
					>
						<option value='' disabled>
							--- Select min rating ---
						</option>
						{[0, 1, 2, 3, 4, 5].map((rating) => {
							return (
								<option key={rating} value={rating}>
									{rating}
								</option>
							);
						})}
					</Form.Select>
				</Form.Group>
				
				{/* Sort */}
				<Form.Group className='mb-3'>
					<Form.Label className='me-3'>Sort by:</Form.Label>
					<Form.Check
						inline
						label='Date'
						name='searchSort'
						type='radio'
						value='date'
						onChange={this.updateFormField}
						checked={this.state.searchSort === 'date'}
					/>
					<Form.Check
						inline
						label='Rating'
						name='searchSort'
						type='radio'
						value='rating'
						onChange={this.updateFormField}
						checked={this.state.searchSort === 'rating'}
					/>
				</Form.Group>

				<div className='d-flex justify-content-center mt-4'>
					<Button
						className='btn-custom-primary me-3'
						variant='primary'
						onClick={this.searchRecipes}
					>
						Search
					</Button>
					<Button
						className='font-weight-500'
						variant='danger'
						onClick={this.clearSearch}
					>
						Clear
					</Button>
				</div>
			</div>
		);
	};

	renderRecipes = (recipes) => {
		if (recipes.length > 0) {
			return recipes.map((recipe) => {
				return (
					<div
						className='col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-stretch'
						key={recipe._id}
					>
						<RecipeCard
							bookmarkCta='add'
							recipe={recipe}
							setActivePage={this.props.setActivePage}
						/>
					</div>
				);
			});
		} else {
			return (
				<div className='container ms-3 mt-3'>
					<span>No results found</span>
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
					}}
				>
					{pageNumber}
				</Pagination.Item>
			);
		}

		// Return pagination when there are results
		if (this.state.recipes.length > 0) {
			return (
				<div className='container-fluid d-flex justify-content-center align-items-center mt-5 mb-3'>
					<Pagination size='sm'>{items}</Pagination>
				</div>
			);
		}
		return '';
	};

	searchRecipes = () => {
		this.setState({
			submitStatus: true,
			contentLoaded: false
		});
	};

	clearSearch = () => {
		this.setState({
			searchRecipeName: '',
			searchBeans: [], // Default to an empty array
			searchGrinder: '',
			searchMethod: '',
			searchBrewer: '',
			searchMinRating: '', // Default value
			searchSort: 'date' // Default sorting
		});
	};

	setActivePageNumber = (activePageNumber) => {
		this.setState({
			activePageNumber: activePageNumber,
			contentLoaded: false,
			submitStatus: true // Sending another GET request
		});
	};

	handleShow = () => {
		this.setState({
			fullscreen: true,
			show: true
		});
	};

	setShow = (value) => {
		this.setState({
			show: value
		});
	};

	highlightOption = (value) => {
		if (this.state.beans.includes(value)) {
			return 'dropdown-selected';
		}
		return '';
	};

	render() {
		return (
			<React.Fragment>
				<section className='container-fluid d-flex flex-column flex-lg-row justify-content-center align-items-center align-items-lg-start adjust-margin-top'>
					{/* Quick search bar (Mobile) */}
					<Container className='search-box d-flex d-lg-none justify-content-center align-items-center pt-4 mx-auto'>
						<Form.Control
							name='searchRecipeName'
							type='search'
							placeholder='Search recipe name'
							value={this.state.searchRecipeName}
							onChange={this.updateFormField}
						/>
						<Button
							className='btn-custom-primary'
							variant='primary'
							onClick={this.searchRecipes}
						>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</Button>

						{/* Advanced search modal (Mobile) */}
						<Button
							className='btn-custom-primary'
							onClick={() => this.handleShow()}
						>
							<FontAwesomeIcon icon={faFilter} />
						</Button>
					</Container>

					<Modal
						show={this.state.show}
						fullscreen={this.state.fullscreen}
						onHide={() => this.setShow(false)}
					>
						<Modal.Header closeButton>
							<Modal.Title>Advanced Search</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{this.renderSearchForm()}
						</Modal.Body>
					</Modal>

					{/* Advanced search side component (Desktop) */}
					<div className='col-lg-3 d-none d-lg-block mt-lg-3 mx-auto'>
						{this.renderSearchForm()}
					</div>

					{/* Recipes */}
					<div className='result-box row col-lg-9 mt-3 mt-lg-3'>
						{this.state.contentLoaded ? (
							<React.Fragment>
								{this.renderRecipes(this.state.recipes)}
								{this.renderPagination()}
							</React.Fragment>
						) : (
							<LoadingSpinner />
						)}
					</div>
				</section>
			</React.Fragment>
		);
	}
}
