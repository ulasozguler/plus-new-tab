var extIdArr = new Array();

chrome.management.getAll(
	function(extensions){
		extensions.forEach(function(ext) {
			if(ext.type != "extension" && ext.type != "theme") {
				extIdArr.push(ext.id+'');
				//console.log(ext.name + ' - ' + ext.appLaunchUrl);
				//console.log(ext.id);
			}
		});
		//console.log(extensions);
	}
)

function onExtChanged(ext) {
	if(ext.type != "extension" && ext.type != "theme") {
		if(in_array(ext.id, extIdArr)) {
			console.log('cikar');
		} else {
			console.log('ekle');
		}
	}
	//console.log(ext);
	//console.log(extIdArr);
}

chrome.management.onInstalled.addListener(onExtChanged);
chrome.management.onUninstalled.addListener(onExtChanged);
chrome.management.onEnabled.addListener(onExtChanged);
chrome.management.onDisabled.addListener(onExtChanged);

function in_array(needle, haystack) {
	for(var key in haystack) {
		if(needle === haystack[key]) {
			return true;
		}
	}
	return false;
}