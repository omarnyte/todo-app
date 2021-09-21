# Todo App
[![Node.js CI](https://github.com/omarnyte/todo-app/actions/workflows/test.yml/badge.svg)](https://github.com/omarnyte/todo-app/actions/workflows/test.yml)

## Local Development

### Requirements
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) 

### Setup 
1. Clone the repo 

2. Install dependencies

    `npm install`

3. Start the app on default port 3000

    `npm start`

### Testing
Tests are written using [Jest](https://jestjs.io/).

- To run tests: 
        
  `npm test`

## CI/CD
This project uses Github Actions for CI/CD. The worfklow will:
- run all tests
- build the app

## Contributing
1. Fork and clone the repo.
2. Follow the [setup](#setup) steps outlined above.
3. Make your changes, ensuring that code coverage remains at 100%.
4. Open a pull request documenting your changes. Please ensure that that GitHub Actions workflow succeeds. 
