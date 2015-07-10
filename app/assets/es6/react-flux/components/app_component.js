import React from 'react';

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