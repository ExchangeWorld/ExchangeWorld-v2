const MAX_WAITING_TIME = 5 * 1000;

module.exports = {

	'Desktop Layout': function(browser) {
		browser
			.url(browser.launch_url + '/admin')
			.resizeWindow(1600, 900)
			.waitForElementPresent('body', MAX_WAITING_TIME)
			.assert.containsText('.topbar__brand', '後台')
			.assert.elementNotPresent('.layout__mask')
			.assert.hidden('.layout-sidenav__menu');
	},

	'Mobile Layout': function(browser) {
		browser
			.url(browser.launch_url + '/admin')
			.resizeWindow(640, 480)
			.waitForElementPresent('body', MAX_WAITING_TIME)
			.assert.elementNotPresent('.layout__mask')
			.assert.elementPresent('.layout-sidenav__menu')
			.assert.hidden('.layout-sidenav')
			.click('.layout-sidenav__menu')
			.waitForElementVisible('.layout__mask', MAX_WAITING_TIME)
			.waitForElementVisible('.layout-sidenav__menu', MAX_WAITING_TIME);
	},

	after: function(browser) {
		browser.end();
	}

};