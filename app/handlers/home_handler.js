module.exports = {
	/*

	{{handlername}}_handler.js
	
	get('/action', "handlername#action")

	action: function(req, res) { -----> will automatically render views/{{handlername}}/action <--  
		return {  ------> view data																																 |
			data: "Some data",																																			 |
			render: "home/render" ------> override the default template <-----------------------------
		}
	}

	*/

	index: function() {
		return {
			data: "hello"
		}
	},

	show: function() {
	},

	forced: function() {
		return {
			render: "home/render"
		}
	}
};