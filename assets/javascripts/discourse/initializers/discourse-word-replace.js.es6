export function setup(helper) {
  if (!helper.markdownIt) { return; }

  helper.registerOptions((opts, siteSettings) => {
    opts.features.['discourse_word_replace_enabled'] = !!siteSettings.discourse_word_replace_enabled;
    opts.features.['discourse_word_replace_list'] = !!siteSettings.discourse_word_replace_list;

    if (opts.features.['discourse_word_replace_enabled']) {
      let words = opts.features.['discourse_word_replace_list'].split('|');
      words.map(x => {
        let key = x.split(',')[0].toLowerCase().trim();
        let val = x.split(',')[1].toLowerCase().trim();
        md.core.textPostProcess.ruler.push(key, {
          matcher: `/${key}/`,
          onMatch: function (buffer, matches, state) {
            let token = new state.Token('text', '', 0);
            token.content = val;
            buffer.push(token);
          }
        });
      });
    }
  });
}
