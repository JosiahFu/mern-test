import express, { Request } from 'express';
import { startDockerContainer, stopDockerContainer } from 'database';
import { MongoClient } from 'mongodb';
import { setupRoutes } from './routes.js';

// Setup Container
const containerName: string | undefined = process.argv[2];
const container = await startDockerContainer(containerName);

// Setup MongoDB connection
const mongo = new MongoClient('mongodb://localhost:27107');
await mongo.connect();
console.log('Connected to MongoDB server');
const db = mongo.db();

// Setup App
const app = express();

setupRoutes(app, db);

// Run server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Started Express server on http://localhost:${port}`);
});

// Handle exit
const onExit = async () => {
    console.log('\nReceived kill signal, shutting down gracefully...');
    server.close();
    console.log('Stopped Express server');
    mongo.close();
    console.log('Closed MongoDB connection')
    await stopDockerContainer(container);
    console.log('Backend stopped');
    process.exit(0);
};

process.on('SIGINT', onExit);
process.on('SIGTERM', onExit);
