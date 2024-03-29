define([
	'utils/invariant'
], function(invariant) {
	'use strict';

	var CSSCore = {
		/**
		* Adds the class passed in to the element if it doesn't already have it.
		*
		* @param {DOMElement} element the element to set the class on
		* @param {string} className the CSS className
		* @return {DOMElement} the element passed in
		*/
		addClass: function(element, className) {
		invariant(
			!/\s/.test(className),
			'CSSCore.addClass takes only a single class name. "%s" contains ' +
			'multiple classes.', className
		);

		if (className) {
			if (element.classList) {
				element.classList.add(className);
			} else if (!CSSCore.hasClass(element, className)) {
				element.className = element.className + ' ' + className;
			}
		}
		return element;
		},

		/**
		* Removes the class passed in from the element
		*
		* @param {DOMElement} element the element to set the class on
		* @param {string} className the CSS className
		* @return {DOMElement} the element passed in
		*/
		removeClass: function(element, className) {
		invariant(
			!/\s/.test(className),
			'CSSCore.removeClass takes only a single class name. "%s" contains ' +
			'multiple classes.', className
		);

		if (className) {
			if (element.classList) {
				element.classList.remove(className);
			} else if (CSSCore.hasClass(element, className)) {
				element.className = element.className
					.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
					.replace(/\s+/g, ' ') // multiple spaces to one
					.replace(/^\s*|\s*$/g, ''); // trim the ends
			}
		}
		return element;
		},

		/**
		* Helper to add or remove a class from an element based on a condition.
		*
		* @param {DOMElement} element the element to set the class on
		* @param {string} className the CSS className
		* @param {*} bool condition to whether to add or remove the class
		* @return {DOMElement} the element passed in
		*/
		conditionClass: function(element, className, bool) {
			return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
		},

		/**
		* Tests whether the element has the class specified.
		*
		* @param {DOMNode|DOMWindow} element the element to set the class on
		* @param {string} className the CSS className
		* @returns {boolean} true if the element has the class, false if not
		*/
		hasClass: function(element, className) {
			invariant(
				!/\s/.test(className),
				'CSS.hasClass takes only a single class name.'
			);
			if (element.classList) {
				return !!className && element.classList.contains(className);
			}
			return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
		}
	};

	return CSSCore;
});