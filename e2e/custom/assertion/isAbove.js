/**
 * Checks if the given element contains the specified text.
 *
 * ```
 *        this.demoTest = function (client) {
 *            browser.assert.isAbove('#main', 'The Night Watch');
 *        };
 * ```
 *
 * @method isAbove
 * @param {string} selector The selector (CSS / Xpath) used to locate the element.
 * @param {string} expected to be above.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

var util = require('util');
exports.assertion = function(selector, valueToBeAbove, msg) {

	var MSG_ELEMENT_NOT_FOUND = 'Testing if element <%s> value is above: "%s". ' +
		'Element could not be located.';

	this.message = msg ||
		util.format('Testing if element <%s> is above: "%s".', selector, valueToBeAbove);

	this.expected = function() {
		return valueToBeAbove;
	};

	this.pass = function(value) {
		if (isNaN(value) || isNaN(valueToBeAbove)) {
			return false;
		}
		return parseInt(value, 10) > parseInt(valueToBeAbove, 10);
	};

	this.failure = function(result) {
		var failed = result === false || result && result.status === -1;
		if (failed) {
			this.message = msg || util.format(MSG_ELEMENT_NOT_FOUND, selector, valueToBeAbove);
		}
		return failed;
	};

	this.value = function(result) {
		return result.value;
	};

	this.command = function(callback) {
		return this.api.getText(selector, callback);
	};

};
