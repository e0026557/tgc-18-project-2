import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default class AddToFavoritesModal extends React.Component {
	// --- State ----
	state = {
		email: '',
    recipeid: this.props.recipeid
	};

	// --- Functions ---
	updateFormField = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

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
					<Form.Control
						className='mt-4 mb-3'
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
					<Button variant='primary' onClick={this.props.onHide}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
