import React from 'react';

export default class Nested extends React.Component {
	render() {
		return (
			<div>
				I am a nested component with props!
				<h1>{this.props.username}</h1>
                <h1>{this.props.match.path}</h1>
			</div>
		);
	}
}
