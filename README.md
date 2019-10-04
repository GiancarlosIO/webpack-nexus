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
* _webpack-nexus.js: file to configure/overrite the actual webpack configuratin, coming soon..._

## Usage

### Install
npm:
> npm install -g webpack-nexus

yarn
> yarn global add webpack-nexus

## Create an app
> webpack-nexus the-name-of-your-project

It will create a folder with your project name, navigate to it.
```
the-name-of-your-project
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


More commands are comming... ⏳

## Some questions:

### I don't want to use typescript, javascript is good for me.

By default it will create a .tsx file in the src folder but you can change it for a .js or .ts file.

### Why i created this project?

Well, actually I have two reasons for this:

1. I hate the boilerplate i have to do to start a new project. So I created a cli to start a project in a rapid way.
2. I want to learn how to build something like create-react-app/next.js.

### What is the difference with other projects like create-react-app or next.js?

Well, I tested create-react-app and I think it is awesome but I don't like the way it works.

- You need to _eject_ to add your own webpack or babel plugins.
- You need to _eject_ to configure prettier/eslint.
- If you have lint errors it will throw a error. Some times I just want to test some egde cases. webpack-nexus doesn't throw a error beacause it is not configured inside webpack, it is just used to lint the files in vscode.
- It doesn't have support for multi-entries. It can be configured for that, but again, you need to _eject_.
- It has no styled-components installed. 😛
- I has no configured apollo graphql. Graphql is what I always use in my projects. 😛

And... It is not comparable with next.js because it is not a react framework. 👺

## Browser support
> \>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9