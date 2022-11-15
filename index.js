const po2json = require('po2json');

module.exports = function(source) {
  let options = this.getOptions();
  if (options === null) {
    options = {
      format: 'jed'
    };
  }

  // default option
  if (!('stringify' in options)) {
    options.stringify = true;
  }

  if (/^export/.test(source)) return source;

  return `export const strings = ${JSON.stringify(
    po2json.parse(source, options)
  )}`;
};
