import { withPluginApi } from "discourse/lib/plugin-api";

function initializeDiscourseWordReplace(api, siteSettings) {

	api.decorateCooked($elem => {
		let currText = $elem.children().first().text();
		let words = Discourse.SiteSettings.discourse_word_replace_list.split('|');
		words.map(x => { 
			let key = x.split(',')[0]; 
			let val = x.split(',')[1]; 
			currText = currText.replace(new RegExp(key, 'g'), val); 
		});
		$elem.children().first().text(currText);
	});
}

export default {
  name: "discourse-word-replace",
  initialize(container) {
	const siteSettings = container.lookup('site-settings:main');
	if (siteSettings.discourse_word_replace_enabled && siteSettings.discourse_word_replace_list) {
		withPluginApi('0.1', api => initializeDiscourseWordReplace(api, siteSettings));
	}
  }
};
