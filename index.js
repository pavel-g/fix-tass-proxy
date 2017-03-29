var FixTass = require('./fix-tass.js');
var FixOverclockers = require('./fix-overclockers.js');

module.exports = {
	
	replaceServerResDataAsync: function(req, res, serverResData, callback) {
		var re = /http:\/\/tass.ru\/js\/common\/tass\.js.*/i;
		var re2 = new RegExp(".*overclockers\.ru", "i");
		if (re.test(req.url)) {
			try {
				serverResData = FixTass(serverResData.toString());
			} catch (ex) {
				console.error('Ошибка при исправлении tass.js:', ex);
			}
		} else if (re2.test(req.headers.host) && req.url === '/') {
			try {
				serverResData = FixOverclockers(serverResData.toString());
			} catch (ex) {
				console.error('Ошибка при исправлении overclockers:', ex);
			}
		}
		callback(serverResData);
	},
	
};
