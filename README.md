# webpack-nexus 🐨 [![npm](https://img.shields.io/npm/dm/webpack-nexus)](https://www.npmjs.com/package/webpack-nexus) [![npm](https://img.shields.io/npm/v/webpack-nexus)](https://www.npmjs.com/package/webpack-nexus) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)


### Scaffold your project in a couple of seconds. Webpack, Babel, Typescript, React, _Apollo_, syled-components, Eslint, Prettier and VSCode config out of the box.

_The most successful dev work smart, not hard._

---

Webpack nexus is a _simple_ CLI to scaffold your javascript/react projects.

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
* _webpack-nexus.js: file to configure/overrite the actual webpack/babel configuration, coming soon..._
* _Setup/configurations for atom and sublime, coming soon..._

## Quick links
- [Usage](#usage)
- [Stack used](#stack-used)
- [Project structure](#project-structure)
- [Roadmap](#roadmap)
- [Browser support](#browser-support)
- [Some questions](#some-questions)
- [Inspirations](#Inspirations)

## Usage

### Install
npm:
> npm install -g webpack-nexus

yarn
> yarn global add webpack-nexus

### Create an app
> webpack-nexus the-name-of-your-project

You can use the additional argvs to customize the tech stack.
* withApollo: Setup apollo client (v3) and add graphql-tag loader to webpack
* withTailwindcss: Setup tailwind css and add purgecss in production mode.

It will create a folder with your project name, navigate to it.

> cd the-name-of-your-project

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

### Start coding with:
> yarn start # or npm start

To compile in production mode:
> yarn build # or npm run build


That's it, happy coding! 🎉


More commands are coming... ⏳

## Stack used:
- Webpack
- Babel
- Typescript
- Eslint (typescript-parser)
- React
- vscode configuration
- _Jest: coming soon_
- _Apollo client: coming soon_
- _Lint staged + husky: coming soon_

## Project structure

This project is a mono-repo built with lerna.

```
webpack-nexus
├── packages
├──── babel-preset-webpack-nexus
├──── eslint-config-webpack-nexus
├──── nexus-scripts
├──── webpack-nexus
```


## Roadmap

* [x] Finish to implement the main core packages (eslint-config, babel-preset and nexus-scripts, webpack-nexus cli).
* [ ] Finish to implement the rest of comands (withApollo, withTypescript, withTailwind, etc).
* [ ] Finish to implement the interactive cli. Displays questions about the configuration/stack to use.
* [ ] Create the end-to-end tests for the CLI.
* [ ] Create a webpack-nexus.js config file to customize the webpack and babel configurations.
* [ ] Create a documentation of each core package.

## Browser support
> \>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9

## Some questions:

### I don't want to use typescript, javascript is good for me.

By default it will create a .tsx file in the src folder but you can change it for a .js or .ts file.

### Why I created this project?

Well, actually I have two reasons for this:

1. I hate the boilerplate I have to do to start a new project. So I created a cli to start a project in a rapid way.
2. I want to learn how to build something like create-react-app/next.js.

### What is the difference with other projects like create-react-app/react-boilerplate/next.js?

_I want to learn how to build something like create-react-app/next.js. I'm not trying to compete with the big current cli's/boilerplates_

It has a lot of specific configurations used in all of my side-projects, so maybe you are good using the other ones.

Ok, so, I tested create-react-app and I think it is awesome but I don't like the way it works.

- You need to _eject_ to add your own webpack or babel plugins.
- You need to _eject_ to configure/add prettier/eslint rules.
- If you have lint errors it will throw a error. Some times I just want to test some egde cases. webpack-nexus doesn't throw a error because it is not configured inside webpack, it is just used to lint the files in vscode.
- It doesn't have support for multi-entries. It can be configured for that, but again, you need to _eject_.
- It has no styled-components installed.
- It has no apollo graphql configured. Graphql is what I always use in my projects.
- It has no react-hot-loader configured.


react-boilerplate? I really like that, but I just wanted a simple cli to scaffold my projects and not to clone a repository every time.

And... It is not comparable with next.js because it is not a react framework 👺... but maybe in the future it can be? 🤔

## Inspirations:
- https://github.com/react-boilerplate/react-boilerplate
- https://github.com/facebook/create-react-app
- https://github.com/zeit/next.js
- https://github.com/kentcdodds/kcd-scripts

## Issues
This project is still in development. So, if you find some improvements or errors go ahead and create an issue. 😃