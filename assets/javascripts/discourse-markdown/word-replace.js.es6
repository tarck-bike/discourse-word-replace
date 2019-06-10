import { withPluginApi } from "discourse/lib/plugin-api";

function initializeDiscourseWordReplace(api, siteSettings) {
		let words = siteSettings.discourse_word_replace_list.split('|');

	api.decorateCooked($elem => {
		let currText = $elem.children().first().text().toLowerCase().trim();
		words.map(x => { 
			let key = x.split(',')[0].toLowerCase().trim();
			let val = x.split(',')[1].toLowerCase().trim();
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
