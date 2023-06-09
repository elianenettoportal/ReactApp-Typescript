## WIP

# Reactapp with typescript

Here I will describe the steps to create this application

### Create a new ReactApp

> npx create-react-app myappname --template typescript<br>
> npm install --save typescript @types/node @types/react @types/react-dom @types/jest<br>
> npm i bootstrap
> npm i @fortawesome/fontawesome-free
>
> > go to
> > copy the link tag
> > https://cdnjs.com/libraries/font-awesome/6.4.0
> > past on public/index.html
> >
> > <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
> > npm run dev 
> > npm run startstart

> > go to google fonts
> > https://fonts.google.com/specimen/Ubuntu?query=ubuntu
> > copy the link font you want and past index.css global style
> > Runs the app in the development mode.\
> > Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Configure Typescript

1- Create or edit tsconfig.json Add the json config below. It will define target and module for the typescript transcript. <br>

```
compilerOptions": {
    "outDir": "./dist/",
    "target": "es5",
    "module": "es6",
    "moduleResolution": "node",
    "lib": ["ES6", "DOM"],
    "allowJs": true,
    "jsx": "react-jsx",
    "noImplicitAny": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false
    }
```

2- Configure a config for the webpack for React and TypeScript<br>
We re going to configure webpack to handle taking in the entry files, passing them to TypeScript for compilation and returning a bundled JavaScript script for browsers.<br>
Webpack is a tool that lets you compile JavaScript modules and is also known as a module bundler.<br>
<br>
3- Configure the buildpack<br>
First, to have a webpack in TypeScript need to install webpack and a webpack plugin called ts-loader. ts-loader. The ts-loader is the TypeScript loader for webpack. It is a plugin that helps webpack work well with TypeScript. To do this, run the following command in the terminal <br>

> npm install webpack webpack-cli ts-loader

4- Create a new file called webpack.config.js and add the following code:<br>

```
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
```

5- Add npm scripts in package.json<br>

```
"scripts": {
    "magic": "webpack"
}
```

5- Create index.tsx file - the main entry point file of our project<br>
Make sure you have installer -> react react-dom @types/react @types/react-dom<br>
A build folder with a file named bundle.js has been created after compile and run

> npm run magic

### Publishing

#### GITHUB

> 1- create a repository in Github name= frontend_reactapp<br>
> 2- copy new github URL<br>
> 3- access your Frontend code in VScode<br>
> 4- create a git track <br>
>
> > git init
> > 5- Add copied remote URL to where the files will be send to<br>
> > git remote add origin url <br>

#### HEROKU

> 1- create a new app name =frontend-reactapp<br>
> 2- configure buildpack - heroku/node.js (see details below)<br>
> 3- configure environment variables in Settings:<br>
> REACT_APP_BASE_ROUTE -add the backend hroku app url <br>

#### BUILDPAC

For a react application in heroku we don´t need to create a Prockfile, the commuinit already have a few packages that does the build and here I used one from Heroku.<br>

> 1- Go to heroku dashboard -> settings -> add buildpack<br>
> 2- Select nodejs<br>

### Docker Image

We can also manage this app using Docker. Below is the file to generate the Frontend image for the application. I also added the backend image and the docker compose below.<br>

#### Create a Dockerfile for the React Project - frontend.dockerfile

```
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
```

### Create a Dockerfile for the Typescript Project - backend.dockerfile

```
    FROM node:18-slim as base
    RUN mkdir -p /app
    WORKDIR /app
    COPY backend_typescript/package*.json ./
    COPY backend_typescript/tsconfig.json ./
    RUN npm install
    COPY backend_typescript/ .
    EXPOSE 3333
    CMD [ "npm", "start" ]
```

### Docker-compose - docker-compose.yml

```
    version: "3.7"
    services:
    ts-api:
    image: playground-backend:latest
    ports:
      - 3333:3333
    command: npm run start

    web-frontend:
    image: playground-frontend:latest
    environment:
      PORT: 3005
      PROXY_API: http://playground-backend:3333/
    ports:
      - 3005:3005
```

### Build Docker image<br>

from root - package before backend code<br>

```
  docker build --file=backend_typescript/backend.dockerfile  -t playground-backend .
  docker build --file=frontend_reactapp/frontend.dockerfile  -t playground-frontend .
```

### Run contaier<br>

```
  docker-compose -f docker-compose.yml up
```
