# Reactapp with typescript

1- tsconfig.json
2- webpack for React and TypeScript
we’re going to configure webpack to handle taking in the entry files, passing them to TypeScript for compilation, and returning a bundled JavaScript script for browsers.
webpack is a tool that lets you compile JavaScript modules and is also known as a module bundler.
3- configure the buildpack
To get started with webpack in TypeScript, we need to install webpack and a webpack plugin called ts-loader. ts-loader? As its name implies, ts-loader is the TypeScript loader for webpack. Put simply, it’s a plugin that helps webpack work well with TypeScript.
To do this, run the following command in the terminal:

> npm install webpack webpack-cli ts-loader

create a new file called webpack.config.js and add the following code:
const path = require('path');
module.exports = {
entry: './src/index.tsx',
module: {
rules: [
{
test: /\.tsx?$/,
use: 'ts-loader',
exclude: /node_modules/,
},
],
},
resolve: {
extensions: ['.tsx', '.ts', '.js'],
},
output: {
filename: 'bundle.js',
path: path.resolve(\_\_dirname, 'dist'),
},
};

4- Add npm scripts in package.json
"scripts": {
"magic": "webpack"
}
5- Create index.tsx file - the main entry point file of our project
make sure you have installer -> react react-dom @types/react @types/react-dom
A build folder with a file named bundle.js has been created after compile and run

> npm run magic

### Create a Dockerfile for the React Project - frontend.dockerfile

    FROM node:18-slim as base
    RUN mkdir -p /app
    WORKDIR /app
    COPY frontend_reactapp/package*.json ./
    RUN npm install
    COPY frontend_reactapp/ .
    RUN npm run build
    EXPOSE 3005
    ENV NUXT_HOST=0.0.0.0
    ENV NUXT_PORT=3005
    CMD [ "npm", "start" ]

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
