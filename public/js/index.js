'use strict';

$(document).ready(function () {
	NProgress.start();
	setProtocolHttps();
});

$(window).load(function () {
	NProgress.done();
});

$(document).ajaxStart(function () {
	NProgress.start();
});

$(document).ajaxStop(function () {
	NProgress.done();
});

var protocol = '';

var onKeyUp = function(e) {
	if (e.keyCode == 13) {
		tryNow();
		return true;
	}
	return false;
};

var setProtocolHttp = function () {
	updateProtocol('http:// ');
};

var setProtocolHttps = function () {
	updateProtocol('https:// ');
};

var updateProtocol = function (newProtocol) {
	protocol = newProtocol;
	$('#protocol-str').text(newProtocol);
};

var tryNow = function (e) {
	var proj = {
		name:$('#proj-title').val(),
		endpoint: {
			'target':$('#proj-target').val(),
			'name':$('#proj-title').val()
		}};
	if (proj.endpoint.target.length <= 7) {
		$('#errorModal').modal({});
		return false;
	}
	if (protocol === 'https:// ') {
		proj.endpoint.protocol = 'https'
	} else if (protocol === 'http:// ') {
		proj.endpoint.protocol = 'http'
	} else {
		$('#errorModal').modal({});
		return false;
	}
	
	var request = $.ajax({
		type: 'POST',
		url: '/api/projects',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(proj)
	})
	.done(function (data) {
		window.location.href = '/feed/' + data.id;
	})
	.fail(function (jqXHR, textStatus) {
		$('#errorModal').modal({});
	});

	return false;

};