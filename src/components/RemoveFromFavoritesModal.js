import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default function RemoveFromFavoritesModal(props) {
	// --- Functions ---
	const removeFromFavorites = async () => {
		try {
			console.log(props.recipeid)
			// Attempt to remove recipe to favorites collection of user
			await axios.delete(`${BASE_API_URL}favorites/${props.email}`, {
				recipeId: props.recipeid
			});
		}
		catch(err) {
			console.log(err)
		}
	};
	
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Remove From Favorites
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to remove this recipe from Favorites?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={props.onHide}>
					Close
				</Button>
				<Button variant='primary' onClick={removeFromFavorites}>
					Remove
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
