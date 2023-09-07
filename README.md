# MERN Test

## Requirements

- Docker
- Node.js

Install packages after cloning.

```bash
npm install
```

## Building

```bash
npm run build
```

This will build the server, the client, and the docker container all at once.

## Running

Automatic docker container name:

```bash
npm run start
```

To specify a container name:

```bash
npm run start -- [DATABASE NAME]
```

The server should be ready at [localhost:3000](http://localhost:3000)
