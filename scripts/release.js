#!/usr/bin/env node
const exec = require('child_process').exec;
const readdirSync = require('fs').readdirSync;
const path = require('path');
const async = require('async');

const join = path.join;
const extname = path.extname;

const localesPath = join(__dirname, '..', 'locales');

const languages = readdirSync(localesPath)
    .filter(fileName => extname(fileName) === '.json')
    .map(fileName => fileName.slice(0, fileName.indexOf('.')));

const queue = async.queue((language, callback) => {
  exec('npm run build', {
    cwd: join(__dirname, '..'),
    env: Object.assign(process.env, {
      LOCALE: language,
    }),
  }, (error) => {
    if (!error) {
      console.log('Building', language, 'succeed!');
      callback(null, true);
    } else {
      console.log('Building', language, 'failed!');
      callback(null, false);
      process.exit(1);
    }
  });
}, 2);

queue.push(languages);

queue.drain = () => {
  console.log('Building all assets succeed!');
};
