module.exports = {
	index: function(req, res) {
		res.render('home/index', {
		});
	},

	show: function(req, res) {
		res.render('home/show', {
		});
	}
};