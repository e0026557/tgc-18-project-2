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
		emailError: false
	};

	// --- Functions ---
	updateFormField = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	addToFavorites = async () => {
		// Check that email is valid
		let emailError = true;
		if (validateEmail(this.state.email)) {
			// Add recipe to favorites collection of user
			await axios.post(`${BASE_API_URL}favorites/${this.state.email}`, {
				recipeId: this.props.recipeid
			});
			// Update error flag
			emailError = false;
		}

		// Update submit status and error status in state
		this.setState({
			submitStatus: true,
			emailError: emailError
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
