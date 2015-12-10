const MAX_WAITING_TIME = 5 * 1000;

module.exports = {

	'Main page' : function(browser) {
		browser
			.url(browser.launch_url + '/admin')
			.waitForElementPresent('body', MAX_WAITING_TIME)
			.end();
	},

};