import React, { Component } from 'react';
import './Reset.css';
import './App.css';
import router from './router';

class App extends Component {
	render() {
		return <div id='main_page'>{router}</div>;
	}
}

export default App;
