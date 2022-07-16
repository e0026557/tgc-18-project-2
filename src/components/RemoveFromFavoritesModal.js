import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function RemoveFromFavoritesModal(props) {

	return (
		<Modal
			// {...props}
			show={props.show}
			onHide={props.onHide}
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
				<Button
					variant='primary'
					onClick={() => {
						props.removeFromFavorites(props.recipeid)
					}}
				>
					Remove
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
