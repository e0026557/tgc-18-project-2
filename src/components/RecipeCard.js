import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddToFavoritesModal from './AddToFavoritesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function RecipeCard(props) {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<React.Fragment>
			{/* Recipe card */}
			<Card className='recipe-card mt-3'>
				<Card.Img variant='top' src={props.recipe.image_url} />
				<Card.Body>
					<div className='d-flex justify-content-between align-items-start'>
						<Card.Title>{props.recipe.recipe_name}</Card.Title>
						<a className='btn btn-sm card-btn-bookmark' onClick={() => setModalShow(true)}>
							<FontAwesomeIcon icon={faHeartCirclePlus} />
						</a>
					</div>
					<Card.Text>{props.recipe.description}</Card.Text>
				</Card.Body>
				<Button className='card-btn-info mt-2' variant='primary'>More info</Button>
			</Card>

			{/* Email Modal for adding to Favorites collection */}
			<AddToFavoritesModal
				recipeid={props.recipe._id}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</React.Fragment>
	);
}

