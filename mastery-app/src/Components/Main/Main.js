import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';

export default class Main extends React.Component {
	render() {
		return (
			<div>
				<header className='main_page_header'>
					<section>Mastery</section>
					<section>
						<h1>Home</h1>
					</section>
				</header>
				<div className='main_page_container'>
					<section className='hero_background_image'>
						<h1>Sam's Mastery Project</h1>
					</section>

					<section className='main_page_demos'>
						<h1>Demo Components</h1>
						<p>Here are the examples to acheive mastery!</p>
						<div className='demo_box_container'>
							<Link to='/axios'>
								<section className='demo_box axios_box'>
									<h1>Axios Calls (REST)</h1>
								</section>
							</Link>

							<Link to='/redux'>
								<section className='demo_box redux_box'>
									<h1>Redux</h1>
								</section>
							</Link>

							<section className='demo_box props_box'>
								<h1>Props</h1>
							</section>

							<section className='demo_box explainations_box'>
								<h1>Explainations</h1>
							</section>
						</div>
					</section>

					<section className='buttons_container'>
						<h1>Do you like this site?</h1>
						<div style={{ display: 'flex' }}>
							<button disabled>No.</button>
							<button>Yes</button>
						</div>
					</section>
				</div>
			</div>
		);
	}
}
