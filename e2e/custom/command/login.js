
var account = '';
var password = '';

exports.command = function(callback) {


		var self = this;
		this
		.url(this.launch_url + 'signin')
		.waitForElementVisible('body', 1000)
		.setValue('input[type="text"]', account)
		.setValue('input[type="password"]', password)
		.click('.login')
		.waitForElementPresent('.login-account', 2000);

		if (typeof callback === "function"){
			callback.call(self);
		}



		return this; // allows the command to be chained.

};
