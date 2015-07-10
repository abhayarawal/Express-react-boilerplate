// restful routing

module.exports = (function(get, post, put, del, resource) {

	get("/", "home#index");
	get("/show", "home#show");

	get("/forced", "home#forced");

	// post, put, del, resource not yet implemented

});