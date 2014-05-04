'use strict';

$(document).ready(function () {
	NProgress.start();
	$('#try-now-btn').on('click', Foundation.utils.debounce(function(e){
		tryNow();
	}, 1000, true));
});

$(window).load(function () {
 	$(document).foundation();
 	$(document).foundation('reflow');
	NProgress.done();
});

$(document).ajaxStart(function () {
	NProgress.start();
});

$(document).ajaxStop(function () {
	NProgress.done();
});

var tryNow = function () {
	var proj = {
		name:'Example Project',
		endpoint: {
			target:'telize.com/jsonip',
			name:'Telize'
		}};
	var request = $.ajax({
		type: 'POST',
		url: '/api/projects',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(proj)
	});
	request.done(function (data) {
		window.location.href = '/feed/' + data.id;
	});
	request.fail(function (jqXHR, textStatus) {
		$('#errorModal').foundation('reveal', 'open');
	});
};