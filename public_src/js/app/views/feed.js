/** @jsx React.DOM */
define([
	'jquery',
	'react',
	'views/operation',
	'views/settings'
], function($, React, OperationView, SettingsModal) {
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
				return <OperationView operation={operation}/>;
			});

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
						<div className='col-md-12'>
							{operations}
						</div>
					</div>
					<SettingsModal ref={'settingsModal'} onSaveFailure={this.settingsSavedFailure} onSaveSuccess={this.settingsSavedSuccess} modalId='settingsModal'/>
				</div>
			);
		}
	});

	return operationView;
});