import React from 'react';
import './Redux.css';
import { connect } from 'react-redux';
import { updateUsername } from '../../reducer';
import Nested from './Nested';

class Redux extends React.Component {
	render() {
        console.log(this.props);
		return (
			<div className='redux_container'>
				<h1>{this.props.redux.text}</h1>
				<br />
				<h1>Your current username is {this.props.redux.username}</h1>
				<input
					onChange={(text) => this.props.updateUsername(text.target.value)}
					placeholder='enter a new username'
				/>
                <h1>Is matched? {this.props.match.isExact.toString()}</h1>
                <Nested username={this.props.redux.username} match={this.props.match}/>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		redux: state
	};
}

export default connect(mapStateToProps, { updateUsername })(Redux);
