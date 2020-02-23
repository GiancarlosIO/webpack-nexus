/* eslint-disable newline-after-var */
const fs = require('fs');
const path = require('path');
// const { exec, execSync } = require('child_process');

// const inquirer = require('inquirer');
const chalk = require('chalk');
// const ora = require('ora');
const parseArgs = require('minimist');

const createFolder = require('./utils/createFolder');
const installNpmPackages = require('./utils/installNpmPackages');
const stringifyNpmPackages = require('./utils/stringifyNpmPackages');

const getPackageJsonTemplate = require('./templateFiles/getPackageJsonTemplate');
const getGitIgnoreContent = require('./templateFiles/getGitIgnoreTemplate');
const getHtmlTemplate = require('./templateFiles/getHtmlTemplate');
const getEslintTemplate = require('./templateFiles/getEslintTemplate');
const getTsConfigTemplate = require('./templateFiles/getTsConfigTemplate');
const getVsCodeConfig = require('./templateFiles/getVsCodeConfig');

// 1. accept the name of the project like second param
const argv = parseArgs(process.argv.slice(2), {
  alias: { 'package-manager': 'pm' },
});

const projectName = argv._[0];
const { withApollo, withTailwindcss } = argv;

if (!projectName) {
  console.log(
    chalk.red(
      'We need the name of the project :(.\nEx: webpack-nexus my-new-project',
    ),
  );
  process.exit(1);
}

const folderPath = path.join(process.cwd(), projectName);

// 2. Create the folder with the name of the project
createFolder({
  pathToCreate: folderPath,
  folderName: projectName,
  callback: () => {
    /**
     * 3. Copy the main folders and files
     * - package.json: react, react-dom, nexus-scripts, styled-components
     * - .gitignore
     */

    // ======================== package.json ========================= //
    // console.dir(folderPath);
    const packageJsonPath = path.join(folderPath, 'package.json');
    const extraParams = [
      withTailwindcss ? '--withTailwindcss' : '',
      withApollo ? '--withGraphql' : '',
    ];
    const packageJsonContent = getPackageJsonTemplate({
      projectName,
      extraNexusArgs: extraParams.join(' '),
    });
    fs.writeFileSync(packageJsonPath, packageJsonContent);

    // ======================== .gitignore ========================= //
    const gitignoreDestPath = path.join(folderPath, '.gitignore');
    const gitIgnoreContent = getGitIgnoreContent();
    fs.writeFileSync(gitignoreDestPath, gitIgnoreContent);

    console.log(
      chalk.green(`> Success to create the package.json and .gitignore files`),
    );

    // install the packages inside the folder
    const npmCorePackages = {
      react: '16.10.2',
      'react-dom': '16.10.2',
      'styled-components': '4.4.0',
      'nexus-scripts': '', // always install the last version
      '@types/react': '16.9.5',
      '@types/react-dom': '16.9.1',
      '@types/styled-components': '4.1.19',
      '@hot-loader/react-dom': '16.10.2',
    };
    const apolloPackages = {
      'react-apollo': '3.1.3',
      'apollo-client': '2.6.4',
      'apollo-link': '1.2.13',
      'apollo-cache-inmemory': '1.6.3',
      'apollo-link-http': '1.5.16',
      'graphql-tag': '2.10.1',
      graphql: '14.5.8',
      'apollo-link-error': '1.1.12',
    };

    const coreNpmPackages = stringifyNpmPackages(
      withApollo
        ? {
            ...npmCorePackages,
            ...apolloPackages,
          }
        : npmCorePackages,
    );
    installNpmPackages({
      packages: coreNpmPackages,
      path: folderPath,
      areDevDependencies: false,
    });

    // we need to install the dependencies of the eslint plugin
    const devPackages = {
      '@typescript-eslint/eslint-plugin': '^2.20.0',
      '@typescript-eslint/parser': '^2.20.0',
      'confusing-browser-globals': '^1.0.9',
      eslint: '^6.7.1',
      'eslint-config-airbnb': '^18.0.1',
      'eslint-config-prettier': '^6.10.0',
      'eslint-plugin-import': '^2.18.2',
      'eslint-plugin-jsx-a11y': '^6.2.3',
      'eslint-plugin-prettier': '^3.1.1',
      'eslint-plugin-react': '^7.15.1',
      'eslint-plugin-react-hooks': '^1.7.0',
      prettier: '^1.19.1',
      typescript: '^3.7.2',
      'node-sass': '4.13.0',
    };
    const devPackagesString = stringifyNpmPackages(devPackages);
    installNpmPackages({
      packages: `eslint-config-webpack-nexus ${devPackagesString}`,
      path: folderPath,
      areDevDependencies: true,
    });

    // 4. Create the src/index.tsx and src/index.html files
    // ======================== index.html ========================= //
    const srcFolderPath = path.join(folderPath, 'src');
    fs.mkdirSync(srcFolderPath);

    // TODO: Replace all getTemplateThing with readFileSync to use real js files like templates
    const html = getHtmlTemplate({ projectName });
    const htmlPath = path.join(srcFolderPath, 'index.html');
    fs.writeFileSync(htmlPath, html);

    // ======================== react index.(js|tsx) ========================= //
    // TODO: Permit to change this from cli args
    const jsExtension = 'js';
    const jsPath = path.join(srcFolderPath, `index.${jsExtension}`);

    const extraImports = [withTailwindcss ? "import './tailwind.css';\n" : ''];

    let content = '';
    if (withApollo) {
      content = fs.readFileSync(
        path.resolve(__dirname, './templateFiles/react/apollo.js'),
        'utf8',
      );
    } else {
      content = fs.readFileSync(
        path.resolve(__dirname, './templateFiles/react/default.js'),
        'utf8',
      );
    }
    fs.writeFileSync(
      jsPath,
      `${content.trim().replace('[extraImports];', extraImports.join(''))}\n`,
    );
    console.log(
      chalk.green(
        `> Success to create the index.${jsExtension} and index.html files`,
      ),
    );

    // ======================== tailwind.css ================= //
    if (withTailwindcss) {
      const cssPath = path.join(srcFolderPath, `tailwind.css`);
      const cssTemplate = fs.readFileSync(
        path.resolve(__dirname, './templateFiles/tailwind.css'),
        'utf8',
      );
      fs.writeFileSync(cssPath, `${cssTemplate.trim()}\n`);
      console.log(chalk.green(`> Success to configurate tailwind.`));
    }

    /**
     * 5. Copy rest of configuration files:
     * - .eslintrc.js
     * - .eslintignore
     */
    // ======================== .eslintrc.js ========================= //
    const eslint = getEslintTemplate();
    const eslintPath = path.join(folderPath, '.eslintrc.js');
    fs.writeFileSync(eslintPath, eslint);

    // ======================== .eslintignore ========================= //
    const eslintignore = `
!.*.js
!.*.ts
!.*.tsx
node_modules/
coverage/
dist/
build/
`;
    const eslintignorePath = path.join(folderPath, '.eslintignore');
    fs.writeFileSync(eslintignorePath, eslintignore);
    console.log(chalk.green(`> Success to create the eslint config files`));

    // ======================== tsconfig.json ========================= //
    const tsConfig = getTsConfigTemplate();
    const tsConfigPath = path.join(folderPath, 'tsconfig.json');
    fs.writeFileSync(tsConfigPath, tsConfig);
    console.log(chalk.green(`> Success to create the tsconfig.json file`));

    // ======================== Configure vscode (eslint + ts) ========================= //
    const vscodeConfigFolderPath = path.join(folderPath, '.vscode');
    fs.mkdirSync(vscodeConfigFolderPath);
    const vsConfig = getVsCodeConfig();
    const vsConfigPath = path.join(vscodeConfigFolderPath, 'settings.json');
    fs.writeFileSync(vsConfigPath, vsConfig);
  },
});
