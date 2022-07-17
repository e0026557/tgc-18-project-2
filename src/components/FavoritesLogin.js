import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function FavoritesLogin(props) {
	// --- Functions ---
	const renderErrorMessage = () => {
		if (props.emailError) {
			return (
				<Form.Text className='errorMessage'>
					Invalid email address
				</Form.Text>
			);
		}
	};

	return (
		<React.Fragment>
			<div className='email-box mt-5 d-flex flex-column justify-content-center align-items-center'>
				<h4>Enter email to proceed</h4>
				<div className='mt-3'>
					<Form.Control
						name='email'
						type='email'
						placeholder='Enter email'
						value={props.email}
						onChange={props.updateFormField}
					/>
					{renderErrorMessage()}
				</div>
				<Button
					className='btn-custom-primary mt-4'
					variant='primary'
					type='submit'
					onClick={props.login}
				>
					Retrieve
				</Button>
			</div>
		</React.Fragment>
	);
}
