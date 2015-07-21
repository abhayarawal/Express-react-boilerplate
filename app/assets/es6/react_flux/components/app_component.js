import React from 'react';
import Moment from 'moment';
// import {TestComponent} from './test_component';

var socket = io();

var VideoPlayer = React.createClass({
	getInitialState: () => {
		return {diff: 0};
	},

	componentDidMount: function() {
		var videoplayer = React.findDOMNode(this.refs.videoplayer);

		var sync = function() {
			var videotime = Math.ceil(videoplayer.currentTime),
					now = Moment();

			var diff = now.diff(this.props.timestamp, "seconds")-1;

			if (diff !== videotime) {
				videoplayer.currentTime = diff;
			}

			this.setState({diff});
		};

		var syncInterval = setInterval(sync.bind(this), 500);

		videoplayer.addEventListener('ended', () => {
			clearInterval(syncInterval);
		}, false);
	},

	render: function() {
		return (
			<div>
				<video src="/videos/timelapse.mp4" ref="videoplayer" autoPlay="True" controls="True">
					Your stupid browser does not support html video. Get a better browser.
				</video>

				<p>Video at -> {this.state.diff} seconds</p>
			</div>
		);
	}
});

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
		return { $id: "", $sid: "", connected: false , timestamp: null};
	},

	componentDidMount: function() {
		socket.on('node:handshake', this.handshake);
		socket.on('node:connect:confirm', this.update$sid);
	},

	update$sid: function ( params ) {
		var {$sid, connected, timestamp} = this.state;
		if (!connected) {
			$sid = params.$sid;
			connected = true;
			timestamp = Moment(params.timestamp);
			this.setState({$sid, connected, timestamp});
		}
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
		var elm = `To connect to this node -> `;
		if (this.state.connected) {	elm = `Connected -> `;	}

		return (
			<div>
				<h4>Video component {this.state.$id}</h4>
				<p>{elm} {this.state.$sid}</p>
				{ this.state.connected ? <VideoPlayer timestamp={this.state.timestamp} /> : <ConnectForm connectNode={this.handleNodeConnect} /> } 
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

module.exports = AppComponent;