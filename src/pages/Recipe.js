import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import LoadingSpinner from './../components/LoadingSpinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validateEmail from './../utilities/validateEmail';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default class Recipe extends React.Component {
	// --- State ---
	state = {
		recipe: {},
		email: '',
		reviewChanged: false,
		contentLoaded: false,
		// Modal
		show: false,
		editStatus: false,
		deleteStatus: false,
		emailError: false, // set to true for testing purposes
		accessDeniedShow: false,
		// Review
		reviewTitle: '',
		reviewContent: '',
		reviewRating: '',
		reviewUsername: '',
		reviewEmail: '',
		reviewErrors: []
	};

	// --- Functions ---
	async componentDidMount() {
		// Get Recipe Details
		let response = await axios.get(
			BASE_API_URL + 'recipes/' + this.props.activeRecipe
		);
		let recipe = response.data.data.result;

		// Update state
		this.setState({
			recipe: recipe,
			contentLoaded: true
		});
	}

	async componentDidUpdate() {
		if (this.state.reviewChanged) {
			// Get Recipe Details
			let response = await axios.get(
				BASE_API_URL + 'recipes/' + this.props.activeRecipe
			);
			let recipe = response.data.data.result;

			// Update state
			this.setState({
				recipe: recipe,
				contentLoaded: true,
				reviewChanged: false // Reset to default
			});
		}
	}

	handleShow = (option) => {
		if (option === 'edit') {
			this.setState({
				show: true,
				editStatus: true,
				deleteStatus: false
			});
		} else if (option === 'delete') {
			this.setState({
				show: true,
				editStatus: false,
				deleteStatus: true
			});
		}
	};

	handleClose = () => {
		this.setState({
			show: false,
			editStatus: false,
			deleteStatus: false
		});
	};

	processRequest = async () => {
		// Validate email
		if (!validateEmail(this.state.email)) {
			this.setState({
				emailError: true,
				accessDeniedShow: false
			});
			return;
		}

		// Check if user has access to recipe
		let response = await axios.post(
			BASE_API_URL + 'recipes/' + this.props.activeRecipe + '/access',
			{
				email: this.state.email
			}
		);
		let accessPermission = response.data.data.result;

		// Proceed to handle edit/delete request
		if (accessPermission) {
			if (this.state.deleteStatus) {
				try {
					await axios.delete(
						BASE_API_URL + 'recipes/' + this.props.activeRecipe
					);
					this.props.setActivePage('recipes');
				} catch (err) {
					console.log(err);
				}
			} else if (this.state.editStatus) {
				// Redirect user to Edit page
				this.props.setActivePage('edit');
			}
		} else {
			this.setState({
				accessDeniedShow: true,
				emailError: false
			});
		}
	};

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

	renderRecipeDetails = () => {
		return (
			<React.Fragment>
				{/* Image */}
				<div>
					<img
						className='img-fluid'
						src={this.state.recipe.image_url}
						alt='Photo of coffee'
					/>
				</div>

				<div>
					<h2>{this.state.recipe.recipe_name}</h2>
					<p>Average rating: {this.state.recipe.average_rating}</p>
					<p>By: {this.state.recipe.user.username}</p>
					<p>
						Upload date:{' '}
						{new Date(
							this.state.recipe.date.slice(0, 10)
						).toDateString()}
					</p>
				</div>

				<div>
					<p>{this.state.recipe.description}</p>
				</div>

				<div>
					<p>Total brew time: {this.state.recipe.total_brew_time}</p>
					<p>Brew yield: {this.state.recipe.brew_yield}</p>
				</div>

				<div>
					<p>
						Brewing method: {this.state.recipe.brewing_method.name}
					</p>
				</div>

				<div>
					<p>
						Coffee bean(s):{' '}
						{this.state.recipe.coffee_beans.map((bean) => {
							return bean.name;
						})}
					</p>
					<p>
						Coffee rest period:{' '}
						{this.state.recipe.coffee_rest_period}
					</p>
					<p>
						Amount of coffee: {this.state.recipe.amount_of_coffee}g
					</p>
				</div>

				<div>
					<p>
						Grinder: {this.state.recipe.grinder.brand}{' '}
						{this.state.recipe.grinder.model}
					</p>
					<p>Grind setting: {this.state.recipe.grind_setting}</p>
				</div>

				<div>
					<p>Amount of water: {this.state.recipe.amount_of_water}</p>
					<p>
						Water temperature: {this.state.recipe.water_temperature}{' '}
						celsius
					</p>
				</div>

				<div>
					<p>
						Brewer: {this.state.recipe.brewer.brand}{' '}
						{this.state.recipe.brewer.model}
					</p>
				</div>

				<div>
					<p>
						Additional ingredients:{' '}
						{this.state.recipe.additional_ingredients[0]
							? this.state.recipe.additional_ingredients.join(
									', '
							  )
							: 'None'}
					</p>
					<p>
						Additional equipment:{' '}
						{this.state.recipe.additional_equipment[0]
							? this.state.recipe.additional_equipment.join(', ')
							: 'None'}
					</p>
				</div>

				<div>
					{this.state.recipe.steps.map((step, index) => {
						return (
							<ul key={index}>
								Step {index + 1}: {step}
							</ul>
						);
					})}
				</div>

				<div>
					<Button
						variant='primary'
						onClick={() => {
							this.handleShow('edit');
						}}
					>
						Edit
					</Button>

					<Button
						variant='danger'
						onClick={() => {
							this.handleShow('delete');
						}}
					>
						Delete
					</Button>
				</div>
			</React.Fragment>
		);
	};

	renderReviews = () => {
		return (
			<React.Fragment>
				<h3>Reviews</h3>
				{this.state.recipe.reviews.map((review) => {
					return (
						<div key={review._id}>
							<p>
								Date:{' '}
								{new Date(
									review.date.slice(0, 10)
								).toDateString()}
							</p>
							<p>Title: {review.title}</p>
							<p>Content: {review.content}</p>
							<p>Rating: {review.rating}</p>
							<p>Username: {review.username}</p>
						</div>
					);
				})}
			</React.Fragment>
		);
	};

	renderAddReviewForm = () => {
		return (
			<React.Fragment>
				<div className='container'>
					{/* Reviewer's username */}
					<Form.Group className=''>
						<Form.Label>
							Username <span className='text-danger'>*</span>
						</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter username'
							name='reviewUsername'
							value={this.state.reviewUsername}
							onChange={this.updateFormField}
						/>
						{this.state.reviewErrors.includes('reviewUsername') ? (
							<Form.Text className='errorMessage'>
								Username must be at least 5 characters long
							</Form.Text>
						) : (
							''
						)}
					</Form.Group>

					{/* Reviewer's email */}
					<Form.Group className=''>
						<Form.Label>
							Email <span className='text-danger'>*</span>
						</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							name='reviewEmail'
							value={this.state.reviewEmail}
							onChange={this.updateFormField}
						/>
						{this.state.reviewErrors.includes('reviewEmail') ? (
							<Form.Text className='errorMessage'>
								Invalid email address
							</Form.Text>
						) : (
							''
						)}
					</Form.Group>

					{/* Review title */}
					<Form.Group className=''>
						<Form.Label>
							Title <span className='text-danger'>*</span>
						</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter review title'
							name='reviewTitle'
							value={this.state.reviewTitle}
							onChange={this.updateFormField}
						/>
						{this.state.reviewErrors.includes('reviewTitle') ? (
							<Form.Text className='errorMessage'>
								Title must be at least 5 characters long
							</Form.Text>
						) : (
							''
						)}
					</Form.Group>

					{/* Review content */}
					<Form.Group className=''>
						<Form.Label>
							Content <span className='text-danger'>*</span>
						</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter review content'
							name='reviewContent'
							value={this.state.reviewContent}
							onChange={this.updateFormField}
						/>
						{this.state.reviewErrors.includes('reviewContent') ? (
							<Form.Text className='errorMessage'>
								Content must be at least 5 characters long
							</Form.Text>
						) : (
							''
						)}
					</Form.Group>

					{/* Review rating */}
					<Form.Group className='mb-3'>
						<Form.Label>
							Rating <span className='text-danger'>*</span>
						</Form.Label>
						<Form.Select
							name='reviewRating'
							value={this.state.reviewRating}
							onChange={this.updateFormField}
						>
							<option value='' disabled>
								--- Select rating ---
							</option>
							{[0, 1, 2, 3, 4, 5].map((rating) => {
								return (
									<option key={rating} value={rating}>
										{rating}
									</option>
								);
							})}
						</Form.Select>
						{this.state.reviewErrors.includes('reviewRating') ? (
							<Form.Text className='errorMessage'>
								Please select a rating
							</Form.Text>
						) : (
							''
						)}
					</Form.Group>

					{/* Submit review button */}
					<Button variant='primary' onClick={this.addReview}>
						Add review
					</Button>
				</div>
			</React.Fragment>
		);
	};

	addReview = async () => {
		// Validate review form inputs
		const reviewErrors = this.validateReviewInputs();

		if (reviewErrors.length === 0) {
			// Process review
			let newReview = {
				title: this.state.reviewTitle,
				content: this.state.reviewContent,
				rating: this.state.reviewRating,
				username: this.state.reviewUsername,
				email: this.state.reviewEmail
			};

			await axios.post(
				BASE_API_URL +
					'recipes/' +
					this.props.activeRecipe +
					'/reviews',
				newReview
			);

			// Update state
			this.setState({
				reviewChanged: true,
				contentLoaded: false // Trigger loading animation
			});
		} else {
			this.setState({
				reviewErrors: reviewErrors
			});
		}
	};

	// Validate review form inputs
	validateReviewInputs = () => {
		let reviewErrors = [];

		// Check username
		if (this.state.reviewUsername.length < 5) {
			reviewErrors.push('reviewUsername');
		}

		// Check email
		if (!this.state.reviewEmail || !validateEmail(this.state.reviewEmail)) {
			reviewErrors.push('reviewEmail');
		}

		// Check title
		if (this.state.reviewTitle.length < 5) {
			reviewErrors.push('reviewTitle');
		}

		// Check content
		if (this.state.reviewContent.length < 5) {
			reviewErrors.push('reviewContent');
		}

		// Check rating
		if (!this.state.reviewRating) {
			reviewErrors.push('reviewRating');
		}

		return reviewErrors;
	};

	render() {
		return (
			<React.Fragment>
				<section className='adjust-margin-top'>
					{this.state.contentLoaded ? (
						<React.Fragment>
							{this.renderRecipeDetails()}
							{this.renderAddReviewForm()}
							{this.renderReviews()}
						</React.Fragment>
					) : (
						<LoadingSpinner />
					)}

					{/* Validation modal for edit/delete */}
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>
								{this.state.editStatus
									? 'Edit Recipe'
									: 'Delete Recipe'}
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{this.state.accessDeniedShow ? (
								<Alert variant='danger'>
									Permission denied
								</Alert>
							) : (
								''
							)}
							<h6>Enter email to proceed</h6>
							<Form.Group className='mt-3'>
								<Form.Control
									name='email'
									type='email'
									placeholder='Enter email'
									value={this.state.email}
									onChange={this.updateFormField}
								/>
								{this.state.emailError ? (
									<Form.Text className='errorMessage'>
										Invalid email address
									</Form.Text>
								) : (
									''
								)}
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant='secondary'
								onClick={this.handleClose}
							>
								Close
							</Button>
							<Button
								variant={
									this.state.deleteStatus
										? 'danger'
										: 'primary'
								}
								onClick={this.processRequest}
							>
								{this.state.deleteStatus
									? 'Confirm delete'
									: 'Proceed'}
							</Button>
						</Modal.Footer>
					</Modal>
				</section>
			</React.Fragment>
		);
	}
}
