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

export default class RecipeCard extends React.Component {
	// --- State ---
	state = {
		modalShow: false
	};

	// --- Functions ---
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
					onHide={() =>
						this.setState({
							modalShow: false
						})
					}
				/>
			);
		} else if (this.props.bookmarkCta === 'remove') {
			return (
				<RemoveFromFavoritesModal
					recipeid={this.props.recipe._id}
					show={this.state.modalShow}
					onHide={() =>
						this.setState({
							modalShow: false
						})
					}
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
						<div className='d-flex justify-content-between align-items-start'>
							<Card.Title>
								{this.props.recipe.recipe_name}
							</Card.Title>
							<Button
								className='btn btn-sm card-btn-bookmark'
								onClick={() =>
									this.setState({
										modalShow: true
									})
								}
							>
								{this.renderBookmarkIcon()}
							</Button>
						</div>
						<Card.Text>{this.props.recipe.description}</Card.Text>
					</Card.Body>
					<Button
						className='card-btn-info mt-2'
						variant='primary'
						onClick={() => {
							this.props.setActivePage('recipe');
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
