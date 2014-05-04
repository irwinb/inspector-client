/*
 * GET home page.
 */

exports.notFound = require('./notFound.js').notFound;

exports.index = function(req, res){
  res.render('index', {title:"Inspector"});
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};