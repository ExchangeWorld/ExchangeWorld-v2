module.exports = {

	'Main page' : function(browser) {
		browser
			.url(browser.launch_url + '/admin')
			.waitForElementPresent('body', 5000)
			.end();
	},

};