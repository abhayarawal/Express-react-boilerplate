import React from 'react';
import {TestComponent} from './test_component';

var ChatInput = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var message = React.findDOMNode(this.refs.message).value.trim();
		this.props.onMessageSubmit(message);
		React.findDOMNode(this.refs.message).value = '';
		return;
	},

	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Type and hit enter .." ref="message" />
			</form>
		);
	}
});

var socket = io();

var ChatMessage = React.createClass({
	render: function() {
		return (
			<div>{this.props.message}</div>
		);
	}
});

var ChatList = React.createClass({
	render: function () {
		var MessageNodes = this.props.list.map(function (message) {
			return (
				<ChatMessage message={message.message} />
			);
		});
		return (
			<div class="chat-list">
				{MessageNodes}
			</div>
		);
	}
});


var ChatBox = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function () {
		socket.on('chat message', this.messageReceived);
	},

	messageReceived: function(message) {;
		var {data} = this.state;
		data.push({message: message});
		this.setState({data});
	},

	handleMessageSubmit: function(message) {
		socket.emit('chat message', message);
	},

	render: function() {
		return (
			<div>
				<ChatList list={this.state.data} />
				<ChatInput onMessageSubmit={this.handleMessageSubmit} />
			</div>
		);
	}
});


var AppComponent = React.createClass({
	render: function () {
		return (
			<div>
				<h2>Socket io chat</h2>
				
				<ChatBox />
			</div>
		);
	}
});



React.render(
	<AppComponent />,
	document.getElementById('componentMount')
);