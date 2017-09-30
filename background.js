var headerConfigs = {};

// 初始化 headerConfig
function init() {
	$.get(window.host + '/api/dzw/headers_config', {}, function (res) {
		if (res.code === 200) {
			headerConfigs = res.data;
			console.log(headerConfigs)
		}
		// headerConfigs = {
		// 	"vote.weibo.com": {
		// 		"Referer": "http://vote.weibo.com",
		// 		"Origin": "http://vote.weibo.com"
		// 	}
		// };
	},'json');
}
init();


function match_config(url) {
	for (var key in headerConfigs) {
		if (url.indexOf(key) >= 0) {
			return headerConfigs[key];
		}
	}
	return null
}


chrome.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		if (details.type === 'xmlhttprequest') {
			console.log(details);
			var config = match_config(details.url);
			console.log(config);
			var exist_headers = {};
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				var header = details.requestHeaders[i];
				if (config && header.name in config) {
					header.value = config[header.name];
					exist_headers[header.name] = 1;
				}
			}
			if (config) {
				for (var key in config) {
					if (key in exist_headers) {

					}
					else {
						details.requestHeaders.push({name: key, value: config[key]});
					}
				}
			}

			console.log(details.requestHeaders);

			return {requestHeaders: details.requestHeaders};
		}

	},
	{urls: ['<all_urls>']},
	['blocking', 'requestHeaders']
);