const MAX_WAITING_TIME = 5 * 1000;

module.exports = {

	'Desktop Layout': function(browser) {
		browser
			.url(browser.launch_url + '/admin')
			.resizeWindow(1600, 900)
			.waitForElementPresent('body', MAX_WAITING_TIME)
			.assert.containsText('.topbar--brand', '後台')
			.assert.elementNotPresent('.layout--mask')
			.assert.hidden('.layout-sidenav--menu');
	},

	'Mobile Layout': function(browser) {
		browser
			.url(browser.launch_url + '/admin')
			.resizeWindow(640, 480)
			.waitForElementPresent('body', MAX_WAITING_TIME)
			.assert.elementNotPresent('.layout--mask')
			.assert.elementPresent('.layout-sidenav--menu')
			.assert.hidden('.layout-sidenav')
			.click('.layout-sidenav--menu')
			.waitForElementVisible('.layout--mask', MAX_WAITING_TIME)
			.waitForElementVisible('.layout-sidenav--menu', MAX_WAITING_TIME);
	},

	after: function(browser) {
		browser.end();
	}

};