import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import validateEmail from './../utilities/validateEmail';
import validateUrl from './../utilities/validateUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const BASE_API_URL = 'https://coffeetalk-api.herokuapp.com/';

export default class Create extends React.Component {
	// --- State ---
	state = {
		// Recipe fields
		imageUrl: '',
		recipeName: '',
		description: '',
		username: '',
		email: '',
		totalBrewTime: '',
		totalBrewTimeUnits: 'min', // Default units
		brewYield: '',
		brewYieldUnits: 'ml', // Default units
		brewingMethod: '',
		coffeeBeans: [],
		coffeeRestPeriod: '',
		coffeeAmount: '',
		grinder: '',
		grindSetting: '',
		waterAmount: '',
		waterAmountUnits: 'ml', // Default units
		waterTemperature: '',
		additionalIngredients: [''],
		brewer: '',
		additionalEquipment: [''],
		steps: [''],
		// Resources
		beans: [],
		grinders: [],
		brewers: [],
		methods: [],
		// Status
		optionalFields: [], // 'ingredients', 'equipment'
		errors: [], // Array of fields that have errors
		submitStatus: false,
		contentLoaded: false
	};

	// --- Functions ---
	async componentDidMount() {
		// Load all resources in parallel
		let beanRequest = axios.get(BASE_API_URL + 'beans');
		let grinderRequest = axios.get(BASE_API_URL + 'grinders');
		let brewerRequest = axios.get(BASE_API_URL + 'brewers');
		let methodRequest = axios.get(BASE_API_URL + 'methods');

		let [beanResponse, grinderResponse, brewerResponse, methodResponse] =
			await axios.all([
				beanRequest,
				grinderRequest,
				brewerRequest,
				methodRequest
			]);

		// Get beans
		let beans = beanResponse.data.data.result || []; // Set to empty array if no beans in database

		// Get grinders
		let grinders = grinderResponse.data.data.result || []; // Set to empty array if no grinders in database

		// Get brewers
		let brewers = brewerResponse.data.data.result || []; // Set to empty array if no brewers in database

		// Get methods
		let methods = methodResponse.data.data.result || []; // Set to empty array if no methods in database

		// Update state
		this.setState({
			beans: beans,
			grinders: grinders,
			brewers: brewers,
			methods: methods,
			contentLoaded: true
		});
	}

	createRecipe = async () => {
		// Build request body
		let requestBody = {
			imageUrl: this.state.imageUrl,
			recipeName: this.state.recipeName,
			description: this.state.description,
			username: this.state.username,
			email: this.state.email,
			totalBrewTime:
				this.state.totalBrewTime + ' ' + this.state.totalBrewTimeUnits,
			brewYield: this.state.brewYield + ' ' + this.state.brewYieldUnits,
			brewingMethod: this.state.brewingMethod,
			coffeeBeans: this.state.coffeeBeans,
			coffeeRestPeriod: this.state.coffeeRestPeriod,
			coffeeAmount: this.state.coffeeAmount,
			grinder: this.state.grinder,
			grindSetting: this.state.grindSetting,
			waterAmount:
				this.state.waterAmount + ' ' + this.state.waterAmountUnits,
			waterTemperature: this.state.waterTemperature,
			additionalIngredients: this.state.additionalIngredients,
			brewer: this.state.brewer,
			additionalEquipment: this.state.additionalEquipment,
			steps: this.state.steps
		};

		// Attempt to create a new recipe
		try {
			await axios.post(BASE_API_URL + 'recipes', requestBody);
		} catch (err) {
			console.log(err);
		}
	};

	updateFormField = (event) => {
		// Check if input type is checkbox
		if (event.target.type !== 'checkbox') {
			this.setState({
				[event.target.name]: event.target.value
			});
		} else {
			// Uncheck checkbox if it is already checked
			if (this.state[event.target.name].includes(event.target.value)) {
				this.setState({
					[event.target.name]: this.state[event.target.name].filter(
						(element) => element !== event.target.value
					)
				});
			}
			// Check checkbox if it is not already checked
			else {
				this.setState({
					[event.target.name]: [
						...this.state[event.target.name],
						event.target.value
					]
				});
			}
		}
	};

	updateDynamicFormField = (index, event) => {
		let data = [...this.state[event.target.name]];
		data[index] = event.target.value;
		this.setState({
			[event.target.name]: data
		});
	};

	addDynamicFormField = (inputField) => {
		this.setState({
			[inputField]: [...this.state[inputField], '']
		});
	};

	removeDynamicFormField = (inputField) => {
		// Get the last index to be removed
		let index = this.state[inputField].length - 1;
		let data = [...this.state[inputField]];
		data.splice(index, 1);
		this.setState({
			[inputField]: data
		});
	};

	// TODO
	validateFormInputs = () => {
		return;
	};

	render() {
		return (
			<React.Fragment>
				<section className='container-fluid d-flex flex-column justify-content-center align-items-center adjust-margin-top'>
					<div className='container mt-3'>
						{/* Image URL */}
						<Form.Group className='mb-3'>
							<Form.Label>Image URL</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image URL'
								name='imageUrl'
								value={this.state.imageUrl}
								onChange={this.updateFormField}
							/>
							{this.state.errors.includes('imageUrl') ? (
								<Form.Text className='errorMessage'>
									Invalid image URL
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Recipe name */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Recipe name{' '}
								<span className='text-danger'>*</span>
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter recipe name'
								name='recipeName'
								value={this.state.recipeName}
								onChange={this.updateFormField}
							/>
							{this.state.errors.includes('recipeName') ? (
								<Form.Text className='errorMessage'>
									Recipe name must be at least 5 characters
									long
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Description */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Description{' '}
								<span className='text-danger'>*</span>
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter short description'
								name='description'
								value={this.state.description}
								onChange={this.updateFormField}
							/>
							{this.state.errors.includes('description') ? (
								<Form.Text className='errorMessage'>
									Description must be at least 5 characters
									long
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Username */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Username <span className='text-danger'>*</span>
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter username'
								name='username'
								value={this.state.username}
								onChange={this.updateFormField}
							/>
							{this.state.errors.includes('username') ? (
								<Form.Text className='errorMessage'>
									Username must be at least 5 characters long
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Email */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Email <span className='text-danger'>*</span>
							</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								name='email'
								value={this.state.email}
								onChange={this.updateFormField}
							/>
							{this.state.errors.includes('email') ? (
								<Form.Text className='errorMessage'>
									Invalid email address
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Total brew time */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Total brew time{' '}
								<span className='text-danger'>*</span>
							</Form.Label>
							<div className='d-flex'>
								<Form.Control
									type='text'
									placeholder='Enter total brew time'
									name='totalBrewTime'
									value={this.state.totalBrewTime}
									onChange={this.updateFormField}
								/>
								<Form.Select
									name='totalBrewTimeUnits'
									value={this.state.totalBrewTimeUnits}
									onChange={this.updateFormField}
								>
									<option disabled>
										--- Select units ---{' '}
									</option>
									<option value='s'>s</option>
									<option value='min'>min</option>
									<option value='h'>h</option>
								</Form.Select>
							</div>
							{this.state.errors.includes('totalBrewTime') ? (
								<Form.Text className='errorMessage'>
									Invalid total brew time specified
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Brew yield */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Brew yield{' '}
								<span className='text-danger'>*</span>
							</Form.Label>
							<div className='d-flex'>
								<Form.Control
									type='text'
									placeholder='Enter brew yield'
									name='brewYield'
									value={this.state.brewYield}
									onChange={this.updateFormField}
								/>
								<Form.Select
									name='brewYieldUnits'
									value={this.state.brewYieldUnits}
									onChange={this.updateFormField}
								>
									<option disabled>
										--- Select units ---{' '}
									</option>
									<option value='ml'>ml</option>
									<option value='L'>L</option>
								</Form.Select>
							</div>
							{this.state.errors.includes('brewYield') ? (
								<Form.Text className='errorMessage'>
									Invalid brew yield specified
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Brewing method */}
						<Form.Group className='mb-3'>
							<Form.Select
								name='brewingMethod'
								value={this.state.brewingMethod}
								onChange={this.updateFormField}
							>
								<option value='' disabled>
									--- Select brew method ---
								</option>
								{this.state.methods.map((method) => {
									return (
										<option
											key={method._id}
											value={method._id}
										>
											{method.name}
										</option>
									);
								})}
							</Form.Select>
							{this.state.errors.includes('brewingMethod') ? (
								<Form.Text className='errorMessage'>
									Please select a brewing method
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Coffee beans */}
						<Form.Group className='mb-3'>
							<Dropdown autoClose='outside'>
								<Dropdown.Toggle className='dropdown-light'>
									Select coffee bean(s)
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{this.state.beans.map((bean) => {
										return (
											<Dropdown.Item
												as='button'
												key={bean._id}
											>
												<label
													className={
														this.state.coffeeBeans.includes(
															bean._id
														)
															? 'w-100 py-1 dropdown-selected'
															: 'w-100 py-1'
													}
												>
													<input
														type='checkbox'
														className='mx-2'
														name='coffeeBeans'
														value={bean._id}
														onChange={
															this.updateFormField
														}
														checked={this.state.coffeeBeans.includes(
															bean._id
														)}
													/>
													{bean.name}
												</label>
											</Dropdown.Item>
										);
									})}
								</Dropdown.Menu>
							</Dropdown>
							{this.state.errors.includes('coffeeBeans') ? (
								<Form.Text className='errorMessage'>
									Please select at least one coffee bean
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Coffee rest period */}
						<Form.Group className='mb-3'>
							<Form.Select
								name='coffeeRestPeriod'
								value={this.state.coffeeRestPeriod}
								onChange={this.updateFormField}
							>
								<option value='' disabled>
									--- Select coffee rest period ---
								</option>
								<option value='1 to 3 days'>1 to 3 days</option>
								<option value='4 to 6 days'>4 to 6 days</option>
								<option value='7 to 10 days'>
									7 to 10 days
								</option>
								<option value='10 to 13 days'>
									10 to 13 days
								</option>
								<option value='14+ days'>14+ days</option>
							</Form.Select>
							{this.state.errors.includes('coffeeRestPeriod') ? (
								<Form.Text className='errorMessage'>
									Please select coffee rest period
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Coffee amount */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Amount of coffee (g){' '}
								<span className='text-danger'>*</span>
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter amount of coffee'
								name='coffeeAmount'
								value={this.state.coffeeAmount}
								onChange={this.updateFormField}
							/>
							{this.state.errors.includes('coffeeAmount') ? (
								<Form.Text className='errorMessage'>
									Invalid coffee amount specified
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Grinder */}
						<Form.Group className='mb-3'>
							<Form.Select
								name='grinder'
								value={this.state.grinder}
								onChange={this.updateFormField}
							>
								<option value=''>--- Select grinder ---</option>
								{this.state.grinders.map((grinder) => {
									return (
										<option
											key={grinder._id}
											value={grinder._id}
										>
											{grinder.brand} {grinder.model}
										</option>
									);
								})}
							</Form.Select>
							{this.state.errors.includes('grinder') ? (
								<Form.Text className='errorMessage'>
									Please select a grinder
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Grind setting */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Grind setting{' '}
								<span className='text-danger'>*</span>
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter grind setting'
								name='grindSetting'
								value={this.state.grindSetting}
								onChange={this.updateFormField}
							/>
							{this.state.errors.includes('grindSetting') ? (
								<Form.Text className='errorMessage'>
									Please specify grind setting
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Water amount */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Amount of water{' '}
								<span className='text-danger'>*</span>
							</Form.Label>
							<div className='d-flex'>
								<Form.Control
									type='text'
									placeholder='Enter amount of water'
									name='waterAmount'
									value={this.state.waterAmount}
									onChange={this.updateFormField}
								/>
								<Form.Select
									name='waterAmountUnits'
									value={this.state.waterAmountUnits}
									onChange={this.updateFormField}
								>
									<option disabled>
										--- Select units ---{' '}
									</option>
									<option value='ml'>ml</option>
									<option value='L'>L</option>
								</Form.Select>
							</div>
							{this.state.errors.includes('waterAmount') ? (
								<Form.Text className='errorMessage'>
									Invalid water amount specified
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Water temperature */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Water temperature (celsius){' '}
								<span className='text-danger'>*</span>
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter water temperature'
								name='waterTemperature'
								value={this.state.waterTemperature}
								onChange={this.updateFormField}
							/>
							{this.state.errors.includes('waterTemperature') ? (
								<Form.Text className='errorMessage'>
									Invalid water temperature specified
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Brewer */}
						<Form.Group className='mb-3'>
							<Form.Select
								name='brewer'
								value={this.state.brewer}
								onChange={this.updateFormField}
							>
								<option value=''>--- Select brewer ---</option>
								{this.state.brewers.map((brewer) => {
									return (
										<option
											key={brewer._id}
											value={brewer._id}
										>
											{brewer.brand} {brewer.model}
										</option>
									);
								})}
							</Form.Select>
							{this.state.errors.includes('brewer') ? (
								<Form.Text className='errorMessage'>
									Please select a brewer
								</Form.Text>
							) : (
								''
							)}
						</Form.Group>

						{/* Options to trigger optional input fields (ingredients and equipment) */}
						<Form.Group className='mb-3'>
							<Form.Label>Optional Fields:</Form.Label>
							<br />
							<label className='ms-1 me-3'>
								<input
									type='checkbox'
									name='optionalFields'
									value='ingredients'
									onChange={this.updateFormField}
									checked={this.state.optionalFields.includes(
										'ingredients'
									)}
								/>
								Additional Ingredients
							</label>
							<label>
								<input
									type='checkbox'
									name='optionalFields'
									value='equipment'
									onChange={this.updateFormField}
									checked={this.state.optionalFields.includes(
										'equipment'
									)}
								/>
								Additional Equipment
							</label>
						</Form.Group>

						{/* Additional ingredients */}
						{this.state.optionalFields.includes('ingredients') ? (
							<Form.Group className='mb-3'>
								<Form.Label>Additional ingredients</Form.Label>
								{this.state.additionalIngredients.map(
									(ingredient, index) => {
										return (
											<Form.Control
												key={index}
												type='text'
												placeholder='Enter ingredient'
												name='additionalIngredients'
												value={ingredient}
												onChange={(event) =>
													this.updateDynamicFormField(
														index,
														event
													)
												}
											/>
										);
									}
								)}

								<div className='mt-3'>
									<Button
										className='btn-custom-primary'
										onClick={() => {
											this.addDynamicFormField(
												'additionalIngredients'
											);
										}}
									>
										<FontAwesomeIcon icon={faPlus} />
									</Button>
									<Button
										className='btn-custom-primary'
										onClick={() => {
											this.removeDynamicFormField(
												'additionalIngredients'
											);
										}}
									>
										<FontAwesomeIcon icon={faMinus} />
									</Button>
								</div>
							</Form.Group>
						) : (
							''
						)}

						{/* Additional equipment */}
						{this.state.optionalFields.includes('equipment') ? (
							<Form.Group className='mb-3'>
								<Form.Label>Additional equipment</Form.Label>

								{this.state.additionalEquipment.map(
									(equipment, index) => {
										return (
											<Form.Control
												key={index}
												type='text'
												placeholder='Enter equipment'
												name='additionalEquipment'
												value={equipment}
												onChange={(event) =>
													this.updateDynamicFormField(
														index,
														event
													)
												}
											/>
										);
									}
								)}

								<div className='mt-3'>
									<Button
										className='btn-custom-primary'
										onClick={() => {
											this.addDynamicFormField(
												'additionalEquipment'
											);
										}}
									>
										<FontAwesomeIcon icon={faPlus} />
									</Button>
									<Button
										className='btn-custom-primary'
										onClick={() => {
											this.removeDynamicFormField(
												'additionalEquipment'
											);
										}}
									>
										<FontAwesomeIcon icon={faMinus} />
									</Button>
								</div>
							</Form.Group>
						) : (
							''
						)}

						{/* Steps */}
						<Form.Group className='mb-3'>
							<Form.Label>
								Steps <span className='text-danger'>*</span>
							</Form.Label>

							{this.state.steps.map((step, index) => {
								return (
									<Form.Control
										key={index}
										type='text'
										placeholder='Enter step'
										name='steps'
										value={step}
										onChange={(event) =>
											this.updateDynamicFormField(
												index,
												event
											)
										}
									/>
								);
							})}

							{this.state.errors.includes('steps') ? (
								<Form.Text className='errorMessage'>
									Please specify steps
								</Form.Text>
							) : (
								''
							)}

							<div className='mt-3'>
								<Button
									className='btn-custom-primary'
									onClick={() => {
										this.addDynamicFormField('steps');
									}}
								>
									<FontAwesomeIcon icon={faPlus} />
								</Button>
								<Button
									className='btn-custom-primary'
									onClick={() => {
										this.removeDynamicFormField('steps');
									}}
								>
									<FontAwesomeIcon icon={faMinus} />
								</Button>
							</div>
						</Form.Group>

						<Button
							className='btn-custom-primary mt-4'
							type='submit'
              onClick={this.createRecipe}
						>
							Create recipe
						</Button>
					</div>
				</section>
			</React.Fragment>
		);
	}
}
