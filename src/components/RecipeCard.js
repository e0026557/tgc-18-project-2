import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddToFavoritesModal from './AddToFavoritesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default class RecipeCard extends React.Component {
	// const[modalShow, setModalShow] = React.useState(false);
	state = {
		modalShow: false,
	}

	render() {
		return (
			<React.Fragment>
				{/* Recipe card */}
				<Card className='recipe-card mt-3'>
					<Card.Img variant='top' src={this.props.recipe.image_url} />
					<Card.Body>
						<div className='d-flex justify-content-between align-items-start'>
							<Card.Title>{this.props.recipe.recipe_name}</Card.Title>
							<Button
								className='btn btn-sm card-btn-bookmark'
								onClick={() => this.setState({
									modalShow: true
								})}
							>
								<FontAwesomeIcon icon={faHeartCirclePlus} />
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

				{/* Email Modal for adding to Favorites collection */}
				<AddToFavoritesModal
					recipeid={this.props.recipe._id}
					show={this.state.modalShow}
					onHide={() => this.setState({
						modalShow: false
					})}
				/>
			</React.Fragment>
		);
	}

}
