var JsFilters = require('js-filters');
var JsDom = require('jsdom');

function FixOverclockers(content) {
	
	var dom = JsDom.jsdom(content);
	
	var scripts = dom.querySelectorAll('script');
	var i, script;
	var changes = false;
	var fixedScript;
	
	for ( i = 0; i < scripts.length; i++ ) {
		script = scripts[i];
		
		fixedScript = null;
		try {
			fixedScript = JsFilters.FixOverclockers(script.text);
		} catch (ex) {
			console.error('Ошибка:', ex);
			if (script && script.text) {
				console.error('Исходный код:', script.text);
			}
			continue;
		}
		
		if (typeof fixedScript === 'string' && fixedScript.length > 0) {
			script.text = fixedScript;
			changes = true;
		}
	}
	
	if (!changes) {
		return content;
	} else {
		return JsDom.serializeDocument(dom);
	}
}

module.exports = FixOverclockers;
