# React Webapp Boilerplate

[![dependencies Status](https://david-dm.org/jeantimex/react-webapp-boilerplate/status.svg)](https://david-dm.org/jeantimex/react-webapp-boilerplate)
[![devDependencies Status](https://david-dm.org/jeantimex/react-webapp-boilerplate/dev-status.svg)](https://david-dm.org/jeantimex/react-webapp-boilerplate?type=dev)
[![Build Status](https://travis-ci.org/jeantimex/react-webapp-boilerplate.svg?branch=master)](https://travis-ci.org/jeantimex/react-webapp-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/jeantimex/react-webapp-boilerplate/badge.svg)](https://coveralls.io/github/jeantimex/react-webapp-boilerplate)

![rocket](docs/images/rocket.png)<br />

## About

Being a frontend engineer, you probably know many tech names like React, Webpack, Karma, Mocha, Jest etc, it's your responsibility to understand how they work together.

If you have ever tried to scaffold a React project for production, you have to learn quite a lot of new frontend technologies, and sometimes you might get confused why this plugin is used, is it necessary? 

I've spent a lot of time as you do, and I would like to document how to scaffold a React project with the latest technologies and show you how to build something ready for production.

You can use this boilerplate to scaffold your React project, it has a Todo list app that shows your how to use React with Redux and Ract Router, it supports localization as well, or feel free to use this project as a reference.

## Features

**Quick scaffolding**<br />
Save your time in putting React, Redux, Router, Webpack, Jest and localization together, so you can focus on coding your awesome project.

**Basic react eco system**<br />
The scaffolded project will include the latest React, Redux, React Router and React Intl.

**Webpack 3**<br />
Enjoy the tree shaking feature in Webpack 3.

**Jest**<br />
Facebook's painless JavaScript test runner, no need to configure Karma Webpack, no need to use Sinon and Babel Rewire.

## Quick start

**Get up and running**<br />
1. Clone this repo using `git clone https://github.com/jeantimex/react-webapp-boilerplate.git`
2. Run `yarn` or `npm install` to install the dependencies
3. Run `yarn dev` or `npm run dev` to see the example app at `http://localhost:3000`

**Unit testing**<br />
Unit testing is powered by **Jest**, run `yarn test` or `npm test` and the results will be printed:
```
 PASS  tests/pages/todos/Todos.spec.js
 PASS  tests/pages/about/About.spec.js
 PASS  tests/reducers/TodoReducer.spec.js
 PASS  tests/actions/index.spec.js
-----------------|----------|----------|----------|----------|----------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------|----------|----------|----------|----------|----------------|
All files        |      100 |      100 |      100 |      100 |                |
 pages/about     |      100 |      100 |      100 |      100 |                |
  About.js       |      100 |      100 |      100 |      100 |                |
 pages/home      |      100 |      100 |      100 |      100 |                |
  Home.js        |      100 |      100 |      100 |      100 |                |
 pages/todos     |      100 |      100 |      100 |      100 |                |
  Todos.js       |      100 |      100 |      100 |      100 |                |
 reducers        |      100 |      100 |      100 |      100 |                |
  TodoReducer.js |      100 |      100 |      100 |      100 |                |
-----------------|----------|----------|----------|----------|----------------|
```
See [Unit Testing](docs/jest.md) for more details.

**Localization**<br />
This demo supports two locales: `en-US` and `zh-CN`, you can add other locales for your application. By default, `en-US` is used, to choose a different locale for development and final build, simply specify the `LOCALE` node environment to your locale, for example:

- `LOCALE=zh-CN yarn dev` or `LOCALE=zh-CN npm run dev`: Running example app in Chinese language.
- `LOCALE=zh-CN yarn build` or `LOCALE=zh-CN npm run build`: Build the dist for Chinese language.
- `yarn release` or `npm run release`: Bundle the assets for all supported locales that are defined in `app/locales` folder.

## Documents

- [Babel](docs/babel.md)
- [React](docs/react.md)
  - [Redux](docs/redux.md)
  - [Router](docs/react-router.md)
  - [Localization](docs/react-intl.md)
- [Webpack](docs/webpack.md)
- [Unit Testing](docs/jest.md)

## License

This project is licensed under the MIT license, Copyright (c) 2017 Yong Su. For more information see `LICENSE.md`.
