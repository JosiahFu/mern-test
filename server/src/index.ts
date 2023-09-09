import express from 'express';
import { startDockerContainer, stopDockerContainer } from 'database';
import { setupRoutes } from './routes.js';
import { setupDatabase } from './database.js';

// Setup Container
const containerName: string | undefined = process.argv[2];
const container = await startDockerContainer(containerName);

// Setup MongoDB connection
const db = await setupDatabase();
console.log('Connected to MongoDB server');

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

    db.close();
    console.log('Closed MongoDB connection')

    await stopDockerContainer(container);

    console.log('Backend stopped');
    process.exit(0);
};

process.on('SIGINT', onExit);
process.on('SIGTERM', onExit);
