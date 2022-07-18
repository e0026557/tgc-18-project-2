import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from './../components/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default class Recipe extends React.Component {
	// --- State ---
	state = {
		recipe: {},
		contentLoaded: false,
		// Modal
		show: false,
		editStatus: false,
		deleteStatus: false
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
						{Date(
							this.state.recipe.date.slice(
								0,
								this.state.recipe.date.indexOf('T')
							)
						)}
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
						{this.state.recipe.additional_ingredients}
					</p>
					<p>
						Additional equipment:{' '}
						{this.state.recipe.additional_equipment}
					</p>
				</div>

				<div>
					{this.state.recipe.steps.map((step, index) => {
						return (
							<ul>
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

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							{this.state.editStatus ? 'Edit' : 'Delete'}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Enter email to proceed</h4>
						<div className='mt-3'>
							<Form.Control
								name='email'
								type='email'
								placeholder='Enter email'
								value={this.state.email}
								onChange={this.updateFormField}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={this.handleClose}>
							Close
						</Button>
						<Button variant='primary' onClick={this.handleClose}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
		);
	};

	render() {
		return (
			<React.Fragment>
				<section className='adjust-margin-top'>
					{this.state.contentLoaded ? (
						this.renderRecipeDetails()
					) : (
						<LoadingSpinner />
					)}
				</section>
			</React.Fragment>
		);
	}
}
