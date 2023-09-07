import express, { Request } from 'express';
import { startDockerContainer, stopDockerContainer } from 'database';
import { MongoClient } from 'mongodb';

const containerName: string | undefined = process.argv[2];
const container = await startDockerContainer(containerName);

const mongo = new MongoClient('mongodb://localhost:27107');
await mongo.connect();
console.log('Connected to MongoDB server');
const db = mongo.db();
const collection = db.collection<{ value: number }>('documents');

const app = express();

app.use(express.json());
app.use(express.static('client/dist'));

app.post<{}, {}, { value: number }>('/api/count', async (req, res) => {
    await collection.insertOne({ value: req.body.value });
    console.log(`Recieved count entry for ${req.body.value}`);
    res.end('Data recieved successfully');
});

app.get('/api/count', async (req, res) => {
    res.end(JSON.stringify(await collection.find({}).toArray()));
});

const server = app.listen(3000, () => {
    console.log('Started Express server');
});

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
