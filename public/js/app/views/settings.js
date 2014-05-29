/** @jsx React.DOM */
define([
	'jquery',
	'react',
	'models/project',
	'utils/constants',
	'bootstrap'
], function($, React, Project, Const) {
	'use strict';

	var settingsView = React.createClass({displayName: 'settingsView',
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
				React.DOM.div( {className:"modal fade", id:this.props.modalId, tabIndex:"-1", role:"dialog", 'aria-labelledby':"settingsModalLabel", 'aria-hidden':"true"}, 
					React.DOM.div( {className:"modal-dialog"}, 
						React.DOM.div( {className:"modal-content"}, 
							React.DOM.div( {className:"modal-header"}, 
								React.DOM.button( {type:"button", className:"close", 'data-dismiss':"modal", 'aria-hidden':"true"}, "×"),
								React.DOM.h4( {className:"modal-title", id:"settingsModalLabel"}, "Settings")
				      		),
							React.DOM.div( {className:"modal-body"}, 
								React.DOM.form( {className:"form-horizontal", role:"form"}, 
									React.DOM.div( {className:"form-group"}, 
										React.DOM.label( {className:"col-sm-3 control-label"}, "Endpoint"),
										React.DOM.div( {className:"col-sm-9"}, 
											React.DOM.p( {className:"form-control-static"}, 
												this.state.proxyUrl,
												React.DOM.span( {className:"glyphicon glyphicon-paperclip endpoint-copy-icon"})
											)
										)
									),
									React.DOM.div( {className:"form-group"}, 
										React.DOM.label( {className:"col-sm-3 control-label", htmlFor:"projNameInput"}, "Project Name"),
										React.DOM.div( {className:"col-sm-9"}, 
											React.DOM.input( {className:"form-control", type:"text", onKeyPress:this.onInputKeyPress, id:"projNameInput", valueLink:this.linkState('projName')})
										)
									),
									React.DOM.div( {className:"form-group"}, 
										React.DOM.label( {className:"col-sm-3 control-label", htmlFor:"projTargetInput"}, "Target"),
										React.DOM.div( {className:"col-sm-9"}, 
											React.DOM.div( {className:"input-group"}, 
												React.DOM.div( {className:"input-group-btn"}, 
													React.DOM.button( {type:"button", className:"btn btn-default dropdown-toggle", 'data-toggle':"dropdown"}, 
														this.state.protocolStr,React.DOM.span( {className:"caret"})
													),
													React.DOM.ul( {className:"dropdown-menu"}, 
														React.DOM.li(null, React.DOM.a( {href:"#", onClick:this.setProtocolHttps}, 'https://')),
														React.DOM.li(null, React.DOM.a( {href:"#", onClick:this.setProtocolHttp}, 'http://'))
													)
												),
												React.DOM.input( {className:"form-control", type:"text", onKeyPress:this.onInputKeyPress, id:"projTargetInput", valueLink:this.linkState('projTarget')})
											)
										)
									)
								)
							),
							React.DOM.div( {className:"modal-footer"}, 
								React.DOM.button( {type:"button", className:"btn btn-default", onClick:this.hideModal}, "Cancel"),
								React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.handleSave}, "Save")
							)
				    	)
				  	)
				)
			);
		}
	});

	return settingsView;
});