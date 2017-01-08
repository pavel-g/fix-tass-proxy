var FixTassJs = require('fix-tass');

module.exports = {
	
	replaceServerResDataAsync: function(req, res, serverResData, callback) {
		var re = /http:\/\/tass.ru\/js\/common\/tass\.js.*/i;
		if (re.test(req.url)) {
			try {
				serverResData = FixTassJs(serverResData.toString());
			} catch (ex) {
				console.error('Ошибка при исправлении tass.js:', ex);
			}
		}
		callback(serverResData);
	},
	
};
