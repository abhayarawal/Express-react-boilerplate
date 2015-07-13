import React from 'react';
import TestComponent from './test_component';

export class AppComponent extends React.Component {

	render() {
		return (
			<h2>React app component</h2>
		);
	}

}

React.render(
	<AppComponent />,
	document.getElementById('componentMount')
);