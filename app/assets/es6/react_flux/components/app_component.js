import React from 'react';
// import {TestComponent} from './test_component';

var socket = io();

var ConnectForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();

		var location =  React.findDOMNode(this.refs.location).value.trim();
		if (location.length === 4) {
			this.props.connectNode(location);
			React.findDOMNode(this.refs.location).value = "";
		}

		return;
	},

	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" ref="location" />
			</form>
		);
	}
});

var PlayerComponent = React.createClass({
	getInitialState: () => {
		return { $id: "", $sid: "" };
	},

	componentDidMount: function() {
		socket.on('node:handshake', this.handshake);
		socket.on('node:connect:confirm', this.update$sid);
	},

	update$sid: function ( params ) {
		var {$id, $sid} = this.state;
		$sid = params.$sid;
		this.setState({$id, $sid});
	},

	handshake: function( params ) {
		var {$id, $sid} = this.state;
		$id = params.$id;
		$sid = params.$sid;
		this.setState({$id, $sid});
	},

	handleNodeConnect: function (location) {
		socket.emit('node:connect', {location: location, $id: this.state.$id});
	},

	render: function () {
		return (
			<div>
				<h4>Video component {this.state.$id}</h4>
				<p>To connect -> {this.state.$sid}</p>
				<ConnectForm connectNode={this.handleNodeConnect} />
			</div>
		);
	}
});


var AppComponent = React.createClass({
	render: function () {
		return (
			<div>
				<PlayerComponent />
			</div>
		);
	}
});

React.render(
	<AppComponent />,
	document.getElementById('componentMount')
);