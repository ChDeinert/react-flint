# react-flint

react-flint is a Boilerplate to help ignite React Projects.

## Getting started

react-flint allows you to directly start developing your App and later decide if you want to deploy it on an own WebServer as static files, running with express as Webserver or running with express for Serverside rendering and as Webserver.

### Creating your own Project

To create your own Project you can clone this repository into a folder with the name you want your App to have.

`git clone https://github.com/ChDeinert/react-flint.git my-app`

Next you want to change the git origin to your own git repo with `git remote set-url origin git://new.url.here` 
or remove the origin with `git remote remove origin`.

Last you want the App to carry your intended Name. To do this find any occurence of `react-flint` and change it to the name of your app.

### Development

To start the Development environment run `npm run start:dev`

### Running tests

You can run test in different ways:

- To run them once: `npm test`
- To run them, watching to filechanges: `npm run test:watch`
- To run them and collect a coverage report: `npm run test:coverage`

### Production

To build bundles to serve as static files on your own Webserver:
- `npm run build:serverless`

To build bundles & serve them with an express server: 
- build: `npm run build`
- start Server: `npm run start:prod`

To build bundles & serve them with and express server with Serverside Rendering:
- build client & server bundles: `npm run build:ssr`
- start Server: `npm run start:prod:ssr`

## Build with

- [Express.js](http://expressjs.com/)
- [React](https://reactjs.org/)
- [webpack](https://webpack.js.org/)
- [babel](https://babeljs.io/)
- [PostCSS](http://postcss.org/)
- [Jest](https://facebook.github.io/jest/)
- [testing-library](https://testing-library.com/docs/react-testing-library/intro)

## Contribution

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](/tags).
