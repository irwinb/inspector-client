/*
 * Serve JSON to our AngularJS client
 */

var baseUrl = 'http://localhost:8000/';
var request = require('request');

exports.getProject = function (req, res) {
	var id = req.route.params.id;
	if (id.length == 0) {
		res.json(400, {});
		return;
	}
	request.get(baseUrl + "projects/" + id).pipe(res)
};

exports.updateProject = function (req, res) {
	request.post(baseUrl + "projects", {json:req.body}).pipe(res);
};