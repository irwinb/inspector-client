/** @jsx React.DOM */
requirejs(['js/app/config.js'], function() {
	requirejs([
		'jquery',
		'../domReady!',
		'react',
		'progress',
		'feed',
		'views/feed'
	], function($, doc, React, Progress, Feed, FeedView) {
		Progress.init();

		Feed.on('ready', function () {
			var feedView = React.renderComponent(
				<FeedView project={Feed.project} operations={Feed.operations}/>,
				$('#feedContainer')[0],
				function () {
				}
			);
		});
	});
});