module.exports = {
	/*

	{{handlername}}_handler.js
	
	get('/action', "handlername#action")

	action: function(req, res) { -----> will automatically render views/{{handlername}}/action <--  
		return {  ------> view data																																 |
			data: "Some data",																																			 |
			render: "home/render" ------> override the default template <-----------------------------
			layout: "" -----> override default layout. put new layout in the layouts folder
		}
	}

	*/

	index: function() {
	},

	show: function(req, res) {
		res.send("HEllo");
	}
};