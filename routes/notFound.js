/*
 * GET 404 page.
 */

var request = require('request');

var renderNotFound = function (res) {
	res.render('404', {
				title: "Inspector",
				message: ":("});
};

exports.renderNotFound = renderNotFound;

exports.notFound = function (req, res) {
	renderNotFound(res);
};