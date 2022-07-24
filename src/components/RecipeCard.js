import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddToFavoritesModal from './AddToFavoritesModal';
import RemoveFromFavoritesModal from './RemoveFromFavoritesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeartCirclePlus,
	faHeartCircleMinus
} from '@fortawesome/free-solid-svg-icons';

/*
 --- Notes: ---
Required props for RecipeCard (add to favorites):
- bookmarkCta (from page component)
- recipe object (from page component)
- setActivePage function (from Main)

Required props for RecipeCard (remove from favorites):
- bookmarkCta (from page component)
- recipe object (from page component)
- setActivePage function (from Main)
- removeFromFavorites function (from Favorites)
*/

export default class RecipeCard extends React.Component {
	// --- State ---
	state = {
		modalShow: false
	};

	// --- Functions ---
	hideModal = () => {
		this.setState({
			modalShow: false
		});
	};

	renderBookmarkIcon = () => {
		if (this.props.bookmarkCta === 'add') {
			return <FontAwesomeIcon icon={faHeartCirclePlus} />;
		} else if (this.props.bookmarkCta === 'remove') {
			return <FontAwesomeIcon icon={faHeartCircleMinus} />;
		}
	};

	renderBookmarkModal = () => {
		if (this.props.bookmarkCta === 'add') {
			return (
				<AddToFavoritesModal
					recipeid={this.props.recipe._id}
					show={this.state.modalShow}
					onHide={this.hideModal}
				/>
			);
		} else if (this.props.bookmarkCta === 'remove') {
			return (
				<RemoveFromFavoritesModal
					recipeid={this.props.recipe._id}
					show={this.state.modalShow}
					onHide={this.hideModal}
					removeFromFavorites={this.props.removeFromFavorites}
				/>
			);
		}
	};

	render() {
		return (
			<React.Fragment>
				{/* Recipe card */}
				<Card className='recipe-card mt-3'>
					<Card.Img variant='top' src={this.props.recipe.image_url} />
					<Card.Body>
						<Card.Title className='w-100 d-flex justify-content-between align-items-center mb-3'>
							{this.props.recipe.recipe_name}
							<Button
								className='btn btn-sm card-btn-bookmark me-2'
								onClick={() =>
									this.setState({
										modalShow: true
									})
								}
							>
								{this.renderBookmarkIcon()}
							</Button>
						</Card.Title>
						<Card.Text>{this.props.recipe.description}</Card.Text>
					</Card.Body>
					<Button
						className='card-btn-info mt-2'
						variant='primary'
						onClick={() => {
							this.props.setActivePage('recipe', this.props.recipe._id);
						}}
					>
						More info
					</Button>
				</Card>

				{/* Bookmark Modal */}
				{this.renderBookmarkModal()}
			</React.Fragment>
		);
	}
}
