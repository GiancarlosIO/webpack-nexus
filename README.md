# webpack-nexus 🐨 [![npm](https://img.shields.io/npm/dm/webpack-nexus)](https://www.npmjs.com/package/webpack-nexus) [![npm](https://img.shields.io/npm/v/webpack-nexus)](https://www.npmjs.com/package/webpack-nexus)


### Scaffold your project in a couple of seconds. Webpack, Babel, Typescript, React, syled-components, Eslint, Prettier and VSCode config out of the box.

_The most successful dev work smart, not hard._

---

Webpack nexus is a _simple_ CLI to scaffold your react projects.

## Features
* Webpack: Dev and Prod configurations inspired by the awesome work of [React boilerplate](https://github.com/react-boilerplate/react-boilerplate) 🔨
* Babel: ES6/ES7, Jsx and plugins configured for dev and production mode. ⚛️
* Styling with styled-components 💅
* Typing with typescript and eslint ✔️
* Auto formatter with prettier 🔄
* vscode configured to work with eslint + typescript + prettier 💙
* _React-apollo: coming soon..._
* _Jest: coming soon.._
* _Husky + lint-stagged: coming soon..._

## Usage

### Install
npm:
> npm install -g webpack-nexus

yarn
> yarn global add webpack-nexus

## Create an app
> webpack-nexus the-name-of-your-project

It will create a folder with your project name, navigate to it.
the-name-of-your-project
```
├── .vscode
├── node_modules
├── package.json
├── .yarn.lock
├── .tsconfig
├── .gitignore
├── .eslintrc
├── .eslintignore
├── dist
└── src
    ├── index.tsx
    └── index.html
```

> cd the-name-of-your-project

## Start coding with:
> yarn start # or npm start

To compile in production mode:
> yarn build # or npm run build


That's it, happy coding! 🎉


## Javascript ES6 / Typescript support
By default it will create a .tsx file in the src folder but you can change it for a .js or .ts.
## Browser support
> \>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9