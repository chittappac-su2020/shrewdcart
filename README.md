<h1 align="center">
Webapp is the full stack implementation of Node.js, MySQL, Sequelize and React.
</h1>

## clone or download
```terminal
$ git clone git@github.com:chittappac-su2020/webapp.git
$ npm i
```

## project structure
```terminal
.circleci
api
client
config
controllers
middlewaress
models
```

# Usage (run fullstack app on your machine)

## Local machine set up
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)
- [MySQL](https://www.mysql.com/downloads/)

please make sure to run server and client in two different terminals

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install pacakges
$ npm start // run it locally

// build for client app
$ npm run build 
```

## Server-side usage(PORT: 5000)

### Start

```terminal
$ npm i       // npm install packages
$ npm start   // start the server
```

# Dependencies(backend)
bcrypt:4.0.1,
bcryptjs": ^2.4.3,
body-parser: ^1.19.0,
cors: ^2.8.5,
express: ^4.17.1,
jsonwebtoken: ^8.5.1,
morgan: ^1.10.0,
mysql: ^2.18.1,
mysql2: ^2.1.0,
password-validator: ^5.0.3
sequelize: ^5.21.1
