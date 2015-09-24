'use strict';

let resolve = require('path').resolve;
let test = require('tape');
let faker = require('faker');
let jazzon = require('jazzon');
let pkg = require('../package.json');
let plugin = require(resolve(__dirname, '..', pkg.main));

const IGNORE = ['fake', 'definitions', 'locale', 'locales', 'localeFallback'];

test('all methods', assert => {
  let instance = jazzon.create();
  let categories = Object.keys(faker).filter(cat => IGNORE.indexOf(cat) === -1);
  let json = {};

  categories.forEach((cat) => {
    Object.keys(faker[cat]).forEach(method => {
      json[`${ cat }.${ method}`] = `@{ ${ cat }.${ method} }`;
    });
  });

  instance
    .use(plugin())
    .compile(json)
    .then((result) => {
      Object.keys(result).forEach((key) => {
        let props = key.split('.');
        let category = faker[props[0]];
        let method = category[props[1]];

        assert.equal(typeof result[key], typeof method.call(category), `correct type of ${ key }`);
      });

      assert.end();
    }, assert.end);
});

test('numeric arguments', assert => {
  let instance = jazzon.create();
  let json = { test: '@{ lorem.words(5) }' };

  instance
    .use(plugin())
    .compile(json)
    .then((result) => {
      assert.equal(result.test.length, 5, 'got five words');
      assert.end();
    }, assert.end);
});

test('setting locale', assert => {
  let instance = jazzon.create();
  let cyrillic = /[\wа-я]+/ig;
  let json = { test: '@{ name.firstName(1) }' };

  instance
    .use(plugin({ locale: 'ru' }))
    .compile(json)
    .then((result) => {
      assert.equal(result.test.match(cyrillic).length, 1, 'string contains only cyrillic characters');
      assert.end();
    }, assert.end);
});
