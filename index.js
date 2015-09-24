'use strict';

module.exports = function (options) {
  options = (options || {});

  let faker;

  if (options.locale) {
    faker = require(`faker/locale/${ options.locale }`);
  } else {
    faker = require('faker');
  }

  return function (value, helper, arr) {
    helper = helper.replace(/^faker\./, '');

    let category, method;
    let props = helper.split('.');

    if ((category = faker[props[0]])) {
      if ((method = category[props[1]])) {
        let args = (arr && arr.map(value => isNaN(value) ? value : +value));

        return method.apply(category, args);
      }
    }

    return value;
  };
};
