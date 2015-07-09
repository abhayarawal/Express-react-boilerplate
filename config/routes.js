module.exports = (function(get, post) {

	get("/", "home#index");
	get("/show", "home#show");

});