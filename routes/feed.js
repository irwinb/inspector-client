/*
 * GET feed page.
 */

var baseUrl = 'http://localhost:8000/';
var request = require('request');
var notFound = require('../routes/notFound.js');

exports.feed = function(req, res){
	var id = req.route.params.id;
	var callback = function (error, response, body) {
		if (response.statusCode == 200) {
			res.render('feed', {
				title: body.name,
				project: 'var currentProject = ' + body});
		} else {
			notFound.renderNotFound(res);
		}
	};
	request.get(baseUrl + "projects/" + id, callback);
};