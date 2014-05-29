define([
	'jquery',
	'nprogress'
], function($, NProgress) {
	'use strict';

	var progress = {};

	progress.init = function () {
		var numStarted = 0;
		var numCompleted = 0;

		$(document).ajaxStart(function () {
			NProgress.start();
		});
		$(document).ajaxStop(function () {
			numStarted = 0;
			numCompleted = 0;
			NProgress.done();
		});

		$(document).ajaxSend(function () {
			numStarted++;
			NProgress.set(numCompleted/numStarted);
		});
		$(document).ajaxComplete(function () {
			numCompleted++;
			NProgress.set(numCompleted/numStarted);
		});
	};

	return progress;
});