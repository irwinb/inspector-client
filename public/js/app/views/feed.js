/** @jsx React.DOM */
define([
	'jquery',
	'react',
	'views/operation',
	'views/settings'
], function($, React, OperationView, SettingsModal) {
	'use strict';

	var operationView = React.createClass({displayName: 'operationView',
		componentWillMount: function () {
			var collectionChanged = function () {
				this.setProps({
					operations: this.props.operations
				});
			};
			var projectUpdated = function () {
			}
			var operationChanged = function() {
				this.setProps({
					operations: this.props.operations
				});
			};

			var ops = this.props.operations;
			ops.on('add', collectionChanged, this);
			ops.on('remove', collectionChanged, this);
			ops.on('change', operationChanged, this);
		},
		showSettings: function (errResponse) {
			this.refs.settingsModal.showModal(this.props.project);
		},
		settingsSavedSuccess: function (response, project) {
			this.setProps({project: project})
		},
		settingsSavedFailure: function (response, project) {
			console.error(response);
		},
		render: function() {
			var operations = this.props.operations.map(function(operation) {
				return OperationView( {operation:operation});
			});

			return (
				React.DOM.div( {id:"feed", className:"feed"}, 
					React.DOM.div( {className:"row"}, 
						React.DOM.div( {className:"col-md-12"}, 
							React.DOM.h2(null, 
								this.props.project.get('name'),
								React.DOM.span( {className:"pull-right glyphicon glyphicon-cog", onClick:this.showSettings})
							)
						)
					),
					React.DOM.div( {className:"row"}, 
						React.DOM.div( {className:"col-md-12"}, 
							operations
						)
					),
					SettingsModal( {ref:'settingsModal', onSaveFailure:this.settingsSavedFailure, onSaveSuccess:this.settingsSavedSuccess, modalId:"settingsModal"})
				)
			);
		}
	});

	return operationView;
});