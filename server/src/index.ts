import express, { Request } from 'express';
import { MongoClient } from 'mongodb';

const mongo = new MongoClient('mongodb://localhost:27107');

async function runServer() {
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

    app.listen(3000, () => {
        console.log('Started server');
    });
}

export { runServer };
