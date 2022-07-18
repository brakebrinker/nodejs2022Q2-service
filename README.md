# Home Library Service

# Scoring: REST Service

## My own Scope

- **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- **+10** The application code that worked with `Users` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- **+10** The application code that worked with `Tracks` instance instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- **+10** The application code that worked with `Albums` instance instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- **+10** The application code that worked with `Artists` instance instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- **+10** The application code that worked with `Favorites` instance instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- **+10** For each successfully passed test

## Advanced Scope
- **+10** PORT value is stored into `.env` file
- **+20** OpenAPI spec in `doc` folder corresponds with assignment

## Forfeits
- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)

### Total: 70

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Rename .env.example

rename `.env.example` file to `.env`

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Using

Base URL is `http://localhost:4000/`

to use endpoints just add endpoint URL to Base URL `http://localhost:4000/user`

end etc.

### JSON request example

```
{
"login": "franco54",
"password": "test1234"
}
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
