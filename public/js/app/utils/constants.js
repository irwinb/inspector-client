define(['feed'], function(Feed) {
	var constants = {
		proxyHost: 'http://localhost:8000/'
	};
	constants.proxyPath = function () {
		return "rproxy/" + Feed.project.get('id');
	};
	return constants;
});