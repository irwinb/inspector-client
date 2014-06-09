/** @jsx React.DOM */
define([
	'jquery',
	'react',
	'views/operation',
	'views/operationDetails',
	'views/settings'
], function($, React, OperationView, OperationDetails, SettingsModal) {
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

			if (this.props.operations.size() > 0) {
				this.selectOperation(this.props.operations.last());
			}
		},
		selectOperation: function (operation) {
			this.setState({selectedOperation: operation});
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
		onOperationClick: function (operation) {
			this.selectOperation(operation);
		},
		getEmptyOperations: function () {
			return (
				React.DOM.div(null, 
					" No operations yet.. "
				)
			);
		},
		getEmptyOperationDetails: function () {
			return (
				React.DOM.div(null, 
					" No operations yet.. "
				)
			);
		},
		render: function() {
			var operations;
			var operationDetails;
			if (this.props.operations.size() > 0) {
				operations = this.props.operations.map(function(operation) {
					return OperationView( {operation:operation, onOperationClick:this.onOperationClick});
				}, this);
				operationDetails = OperationDetails( {operation:this.state.selectedOperation});
			} else {
				operations = this.getEmptyOperations();
				operationDetails = this.getEmptyOperationDetails();
			}

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
						React.DOM.div( {className:"col-md-4"}, 
							operations
						),
						React.DOM.div( {className:"col-md-8"}, 
							operationDetails
						)
					),
					SettingsModal( {ref:'settingsModal', onSaveFailure:this.settingsSavedFailure, onSaveSuccess:this.settingsSavedSuccess, modalId:"settingsModal"})
				)
			);
		}
	});

	return operationView;
});