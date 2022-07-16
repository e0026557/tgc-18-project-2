import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import validateEmail from './../utilities/validateEmail';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default class AddToFavoritesModal extends React.Component {
	// --- State ----
	state = {
		email: '',
		submitStatus: false,
		emailError: false,
		recipeAlreadyAddedError: false,
		recipeDoesNotExistError: false,
		databaseError: false
	};

	// --- Functions ---
	updateFormField = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	addToFavorites = async () => {
		// Set error flags
		let emailError = true;
		let recipeAlreadyAddedError = false;
		let recipeDoesNotExistError = false;
		let databaseError = false;

		// Check that email is valid
		if (validateEmail(this.state.email)) {
			// Update error flag for email
			emailError =  false;

			// Attempt to add recipe to favorites collection of user
			try {
				await axios.post(`${BASE_API_URL}favorites/${this.state.email}`, {
					recipeId: this.props.recipeid
				});

			}
			catch(err) {
				// Get response status
				const responseStatus = err.response.data.status;
	
				// Get error message if response status is 'fail'
				if (responseStatus === 'fail') {
					const errorMessage = err.response.data.data.recipeId;
	
					if (errorMessage === 'Recipe does not exist') {
						recipeDoesNotExistError = true;
					}
					else if (errorMessage === 'Recipe ID is already in favorites collection') {
						recipeAlreadyAddedError = true;
					}
				}
				// Return database error if none of the above 
				else {
					databaseError = true;
				}
			}
		}

		// Update submit status and error status in state
		this.setState({
			submitStatus: true,
			emailError: emailError,
			recipeAlreadyAddedError: recipeAlreadyAddedError,
			recipeDoesNotExistError: recipeDoesNotExistError,
			databaseError: databaseError
		});
	}

	renderAlert = () => {
		// Check that form is submitted
		if (this.state.submitStatus) {
			// Check error status
			if (this.state.emailError) {
				return (
					<Alert variant='danger'>
						Please enter valid email address
					</Alert>
				)
			}
			else if (this.state.recipeAlreadyAddedError) {
				return (
					<Alert variant='danger'>
						Recipe is already favorited
					</Alert>
				)
			}
			else if (this.state.recipeDoesNotExistError) {
				return (
					<Alert variant='danger'>
						Recipe does not exist
					</Alert>
				)
			}
			else if (this.state.databaseError) {
				return (
					<Alert variant='danger'>
						An error has occurred. Please try again.
					</Alert>
				)
			}
			else {
				return (
					<Alert variant='success'>
						Recipe successfully added to Favorites
					</Alert>
				)
			}
		}
	}

	render() {
		return (
			<Modal
				{...this.props}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Add to Favorites
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.renderAlert()}
					<Form.Control
						className=''
						name='email'
						type='email'
						placeholder='Enter email'
						value={this.state.email}
						onChange={this.updateFormField}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={this.props.onHide}>
						Close
					</Button>
					<Button variant='primary' onClick={this.addToFavorites}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
