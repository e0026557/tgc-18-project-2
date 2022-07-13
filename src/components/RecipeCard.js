import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function RecipeCard(props) {
	return (
		<Card className='recipe-card mt-3'>
			<Card.Img variant='top' src={props.recipe.image_url} />
			<Card.Body>
				<Card.Title>{props.recipe.recipe_name}</Card.Title>
				<Card.Text>{props.recipe.description}</Card.Text>
			</Card.Body>
			<Button variant='primary'>More info</Button>
		</Card>
	);
}
