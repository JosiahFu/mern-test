import express, { Express } from 'express';
import mongoose from 'mongoose';

// See https://expressjs.com/en/guide/routing.html for more documentation

function setupRoutes(app: Express, db: mongoose.Connection) {
    // Interpret requests as JSON
    app.use(express.json());
    // Serve files from client/dist (the React app)
    app.use(express.static('client/dist'));

    // Get the collection from the database
    const Count = db.model('count');

    // POSTs to /api/count should add a database entry
    app.post<{}, {}, { value: number }>('/api/count', async (req, res) => {
        const newCount = new Count({ value: req.body.value });
        await newCount.save();
        console.log(`Recieved count entry for ${req.body.value}`);
        res.end();
    });

    // GET to /api/count should return all the data
    app.get('/api/count', async (req, res) => {
        res.json([...await Count.find()]);
    });
}

export { setupRoutes };
