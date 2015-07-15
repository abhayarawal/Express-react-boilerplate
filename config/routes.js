// restful routing

module.exports = (function(get, post, put, del, resource) {

	get("/", "home#index");
	
	get("/show", "home#show");

});