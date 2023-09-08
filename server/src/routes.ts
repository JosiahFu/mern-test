import express, { Express } from 'express';
import { Db } from 'mongodb';

// See https://expressjs.com/en/guide/routing.html for more documentation

function setupRoutes(app: Express, db: Db) {
    // Interpret requests as JSON
    app.use(express.json());
    // Serve files from client/dist (the React app)
    app.use(express.static('client/dist'));

    // Get the collection from the database
    const collection = db.collection<{ value: number }>('documents');

    // POSTs to /api/count should add a database entry
    app.post<{}, {}, { value: number }>('/api/count', async (req, res) => {
        await collection.insertOne({ value: req.body.value });
        console.log(`Recieved count entry for ${req.body.value}`);
        res.end();
    });

    // GET to /api/count should return all the data
    app.get('/api/count', async (req, res) => {
        res.json(await collection.find({}).toArray());
    });
}

export { setupRoutes };
