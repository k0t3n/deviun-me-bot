const config = require('config');
const template = require('lodash/template');
const get = require('lodash/get');
const log = require('./log');

const DEFAULT_LOCALE = config.get('defaultLocale');
const LOG = '[lib/lang]';

class Lang {
  constructor(locale = DEFAULT_LOCALE) {
    this.locale = locale;
    this.base = config.get(['lang', locale]);
    this.baseDefault = DEFAULT_LOCALE === locale ? 
      this.base :  
      config.get(['lang', DEFAULT_LOCALE]);
  }

  get(path, parseData) {
    const data = get(
      this.base, path,
      get(this, this.baseDefault, '')
    );

    if (!data) {
      log.info(`${LOG} data is not found by path.`, path, JSON.parse(parseData || {}));
    }

    return parseData ? template(data, parseData) : data;
  }
}

module.exports = Lang;
