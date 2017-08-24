import * as fs from 'fs';
import rimraf from 'rimraf';
import { sync as globSync } from 'glob';
import { sync as mkdirpSync } from 'mkdirp';

const messagesPattern = './.tmp/messages/**/*.json';
const outputDir = './app/locales/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = globSync(messagesPattern)
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (Object.prototype.hasOwnProperty.call(collection, id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }

      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

mkdirpSync(outputDir);

fs.writeFileSync(
  `${outputDir}en-US.json`,
  JSON.stringify(defaultMessages, null, 2)
);

rimraf('./.tmp/messages', () => {});
