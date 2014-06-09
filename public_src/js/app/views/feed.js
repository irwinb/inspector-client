/** @jsx React.DOM */
define([
	'jquery',
	'react',
	'views/operation',
	'views/operationDetails',
	'views/settings'
], function($, React, OperationView, OperationDetails, SettingsModal) {
	'use strict';

	var operationView = React.createClass({
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
				<div>
					No operations yet..
				</div>
			);
		},
		getEmptyOperationDetails: function () {
			return (
				<div>
					No operations yet..
				</div>
			);
		},
		render: function() {
			var operations;
			var operationDetails;
			if (this.props.operations.size() > 0) {
				operations = this.props.operations.map(function(operation) {
					return <OperationView operation={operation} onOperationClick={this.onOperationClick}/>;
				}, this);
				operationDetails = <OperationDetails operation={this.state.selectedOperation}/>;
			} else {
				operations = this.getEmptyOperations();
				operationDetails = this.getEmptyOperationDetails();
			}

			return (
				<div id='feed' className='feed'>
					<div className='row'>
						<div className='col-md-12'>
							<h2>
								{this.props.project.get('name')}
								<span className='pull-right glyphicon glyphicon-cog' onClick={this.showSettings}></span>
							</h2>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-4'>
							{operations}
						</div>
						<div className='col-md-8'>
							{operationDetails}
						</div>
					</div>
					<SettingsModal ref={'settingsModal'} onSaveFailure={this.settingsSavedFailure} onSaveSuccess={this.settingsSavedSuccess} modalId='settingsModal'/>
				</div>
			);
		}
	});

	return operationView;
});