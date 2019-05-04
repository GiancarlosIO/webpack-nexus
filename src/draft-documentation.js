/**
 * webpack-nexus cli!
 * It should be a webpack-like-cli to create the next web project
 *
 * Commands:
 * help: just show the all commands
 *
 * init: aks the user for the config he wants
 * questions on init commando:
 * - What is the name of your cool project? (string value)
 * - Do you need to support multiple entries in wbepack? (Multipage application?) yes | no
 * - What type of project you wnat? (combo select) => react | vanilla | (next are comming...)
 * - Do you need typescript? (confirmation) yes | no
 * - In what port do you want to run the webpack server?(just a value) 8080 | 80 | etc...
 * - Do you want eslint? (confirmation) yes | no
 * - Do you want to setup JEST (test framework)?
 *
 * Step 0
 * - Create the nexus-script to run a webpack server
 *  - this script should has your own dependencies
 *      - webpack, express, etc
 * - First implement for vanilla type projects and then for react
 * Step 1:
 * - Implement the create command:
 *    - It should aks for the project name
 *    - Create the webpack server
 *    - Add support to apollo setup
 *    - Add support to eslint
 *    - Add support to jest
 *    - Add support to lint files before to commit it
 * - Then implement the eject command
 *
 *
 *
 * Learnigns
 *  - Yarn is not adding the ^to the packages instaled 😵1
 *  - --display-reasons
 */
