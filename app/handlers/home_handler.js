module.exports = {
	index: function(req, res) {
		return {
			data: "hello"
		}
	},

	show: function(req, res) {
	},

	forced: function(req, res) {
		return {
			render: "home/render"
		}
	}
};