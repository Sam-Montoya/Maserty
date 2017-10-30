import React from 'react';

export default function (props) {

	//Using ComponentWillReceiveProps is a beneficial way of grabbing props that are being passed to the component.
	//The keyword WILL from the method name means that it runs before something happens. It is invoked before a mounted component gets props!
	//However, it doesn't call with the inital props while mounitng. 
	//It is especially good when the parent component has properties being changed.
	
	// componentWillReceiveProps(nextProps) {
	// 	axios.get('/api/getUserInfo' + nextProps.userInfo)
	//
	// console.log(nextProps)
	// }

	return (
		<div>
			I am a nested component with props!
				<h1>{props.username}</h1>
			<h1>{props.match.path}</h1>
		</div>
	)
}
