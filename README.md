# Home Library Service

## Running by Docker

1. To start application
```
docker-compose up
```

2. To build docker and start
```
docker-compose up --build
```

### Docker Scan Vulnerability
To scan Backend image

```
npm run dockerscan:backend
```

To scan DB image

```
npm run dockerscan:db
```
### Troubleshooting 
In case if you face this error
```
Building db
[+] Building 0.0s (1/2)
 => ERROR [internal] load build definition from db.Dockerfile                                                                                                                                                                0.0s
 => => transferring dockerfile: 86B                                                                                                                                                                                          0.0s
------
 > [internal] load build definition from db.Dockerfile:
------
failed to solve with frontend dockerfile.v0: failed to read dockerfile: error from sender: open /home/max/projects/nodejs/rss/nodejs2022Q2-service/db-data: permission denied
ERROR: Service 'db' failed to build : Build failed
```
Just run this command with your userId and groupId
```
sudo chown -R $(id -u):$(id -g) db-data
```

### Links to docker hub images
- Backend - [Backend latest](https://hub.docker.com/layers/nodejs-rss-service/drummen11/nodejs-rss-service/backend-latest/images/sha256-80d6216aef734ffa2a3a3d698f5d30129cccc199b6886c148bb74dd01874c8ef?context=explore).
- Postgres - [DB latest](https://hub.docker.com/layers/nodejs-rss-service/drummen11/nodejs-rss-service/db-latest/images/sha256-30785779c9a02a688387f8c0c2915c1886ebf87e754b0c8474a76dee1b8342f0?context=explore).
- Docker hub repository for this task [Repository](https://hub.docker.com/r/drummen11/nodejs-rss-service/tags)


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
