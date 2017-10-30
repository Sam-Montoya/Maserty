import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Components/Main/Main';
import Axios from './Components/Axios/Axios';
import Redux from './Components/Redux/Redux';
import Nested from './Components/Redux/Nested';

export default (
	<Switch>
		<Route exact path='/' component={Main} />
		<Route path='/axios' component={Axios} test='test'/>
		<Route path='/redux' component={Redux} />
		<Route path='/redux/:test' component={Nested} />
	</Switch>
);
