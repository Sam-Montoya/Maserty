import React from 'react';

export default function (props) {
	return (
		<div>
			I am a nested component with props!
				<h1>{props.username}</h1>
			<h1>{props.match.path}</h1>
		</div>
	)
}
