/** @jsx React.DOM */
define([
	'jquery',
	'react',
	'models/project',
	'utils/constants',
	'bootstrap'
], function($, React, Project, Const) {
	'use strict';

	var settingsView = React.createClass({
		mixins: [React.addons.LinkedStateMixin],
		getInitialState: function () {
			return {
				projName: '',
				projTarget: '',
				isOpen: false
			}
		},
		componentWillReceiveProps: function (nextProps) {
			if (this.props.isOpen && !nextProps.isOpen) {
			} else if (!this.props.isOpen && nextProps.isOpen) {
			}
		},
		showModal: function (project) {
			if (!this.state.isOpen) {
				var newProjObj = JSON.parse(JSON.stringify(project));
				var newProj = new Project(newProjObj);
				this.updateProjectState(newProj);
				$('#' + this.props.modalId).modal('show');
			}
		},
		updateProjectState: function (project) {
			var proxyUrl = Const.proxyHost + Const.proxyPath();
			this.setState({
				project: project,
				projName: project.get('name'),
				projTarget: project.get('endpoint').target,
				proxyUrl: proxyUrl,
				protocol: project.get('endpoint').protocol,
				protocolStr: project.get('endpoint').protocol + '://'
			});
		},
		setProtocolHttps: function () {
			this.setState({
				protocol: 'https',
				protocolStr: 'https://'
			});
			return false;
		},
		setProtocolHttp: function () {
			this.setState({
				protocol: 'http',
				protocolStr: 'http://'
			});
			return false;
		},
		hideModal: function () {
			$('#' + this.props.modalId).modal('hide');
		},
		componentDidMount: function () {
			$('#' + this.props.modalId).on('hide.bs.modal',  (function (e) {
				this.setState({isOpen: false});
			}).bind(this));
			$('#' + this.props.modalId).on('show.bs.modal',  (function (e) {
				this.setState({isOpen: true});
			}).bind(this));
			$('#' + this.props.modalId).on('shown.bs.modal',  (function (e) {
				$('#projNameInput').get(0).focus();
			}).bind(this));
		},
		onInputKeyPress: function (e) {
			if (e.which == 13) {
				this.handleSave();
				return false;
			}
			return true;
		},
		handleSave: function () {
			var newEndpoint = JSON.parse(JSON.stringify(this.state.project.get('endpoint')));
			newEndpoint.target = this.state.projTarget;
			newEndpoint.protocol = this.state.protocol;

			this.state.project.save(
			{
				'name':this.state.projName, 
				'endpoint':newEndpoint
			}, 
			{
				wait:true,
				error: function (model, response, options) {
					this.hideModal();
					this.props.onSaveFailure.apply(null, [response]);
				}.bind(this),
				success: function (model, response, options) {
					this.updateProjectState(model);
					this.props.onSaveSuccess.apply(null, [response, model]);
					this.hideModal();
				}.bind(this)
			});
		},
		nameChanged: function (event) {
		},
		render: function() {
			return (
				// Project name, target URL, and the proxy URL. 
				<div className='modal fade' id={this.props.modalId} tabIndex='-1' role='dialog' aria-labelledby='settingsModalLabel' aria-hidden='true'>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<button type='button' className='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
								<h4 className='modal-title' id='settingsModalLabel'>Settings</h4>
				      		</div>
							<div className='modal-body'>
								<form className='form-horizontal' role='form'>
									<div className='form-group'>
										<label className='col-sm-3 control-label'>Endpoint</label>
										<div className='col-sm-9'>
											<p className='form-control-static'>
												{this.state.proxyUrl}
												<span className='glyphicon glyphicon-paperclip endpoint-copy-icon'></span>
											</p>
										</div>
									</div>
									<div className='form-group'>
										<label className='col-sm-3 control-label' htmlFor='projNameInput'>Project Name</label>
										<div className='col-sm-9'>
											<input className='form-control' type='text' onKeyPress={this.onInputKeyPress} id='projNameInput' valueLink={this.linkState('projName')}/>
										</div>
									</div>
									<div className='form-group'>
										<label className='col-sm-3 control-label' htmlFor='projTargetInput'>Target</label>
										<div className='col-sm-9'>
											<div className='input-group'>
												<div className='input-group-btn'>
													<button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown'>
														{this.state.protocolStr}<span className='caret'></span>
													</button>
													<ul className='dropdown-menu'>
														<li><a href='#' onClick={this.setProtocolHttps}>{'https://'}</a></li>
														<li><a href='#' onClick={this.setProtocolHttp}>{'http://'}</a></li>
													</ul>
												</div>
												<input className='form-control' type='text' onKeyPress={this.onInputKeyPress} id='projTargetInput' valueLink={this.linkState('projTarget')}/>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-default' onClick={this.hideModal}>Cancel</button>
								<button type='button' className='btn btn-primary' onClick={this.handleSave}>Save</button>
							</div>
				    	</div>
				  	</div>
				</div>
			);
		}
	});

	return settingsView;
});