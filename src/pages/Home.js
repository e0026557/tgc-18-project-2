import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
	return (
		<React.Fragment>
			{/* Hero Section */}
			<div className='section-hero adjust-margin-top'>
				<div className='hero-box'>
					<h1 className='hero-header'>CoffeeTalk</h1>
					<span className='hero-span'>Coffee-making made easier</span>
				</div>
				<FontAwesomeIcon icon={faChevronDown} />
			</div>

			{/* Latest 3 Recipes */}

			{/* Top 3 Recipes */}
		</React.Fragment>
	);
}
