export function setup(helper) {
  if (!helper.markdownIt) return;
  let wordList = '';
  let enabled = false;
  helper.registerOptions((opts, siteSettings) => {
    enabled = siteSettings.discourse_word_replace_enabled;
    wordList = siteSettings.discourse_word_replace_list || '';
  });
  helper.registerPlugin(md => {
    if (!enabled) return;
    let words = wordList.split('|');
    words.map(x => {
      let key = x.split(',')[0].toLowerCase().trim();
      let val = x.split(',')[1].toLowerCase().trim();
      md.core.textPostProcess.ruler.push(key, {
        matcher: new RegExp(key, 'g'),
        onMatch: function (buffer, matches, state) {
          let token = new state.Token('text', '', 0);
          token.content = val;
          buffer.push(token);
        }
      });
    });
  });
}