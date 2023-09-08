import express, { Express } from 'express';
import { Db } from 'mongodb';

function setupRoutes(app: Express, db: Db) {
    app.use(express.json());
    app.use(express.static('client/dist'));

    const collection = db.collection<{ value: number }>('documents');

    app.post<{}, {}, { value: number }>('/api/count', async (req, res) => {
        await collection.insertOne({ value: req.body.value });
        console.log(`Recieved count entry for ${req.body.value}`);
        res.end('Data recieved successfully');
    });

    app.get('/api/count', async (req, res) => {
        res.end(JSON.stringify(await collection.find({}).toArray()));
    });
}

export { setupRoutes };
