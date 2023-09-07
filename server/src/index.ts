import express, { Request } from 'express';

function runServer() {
    let count = 0;

    const app = express();

    app.use(express.json());

    app.use(express.static('client/dist'));

    app.post<number>('/api/count', (req: Request<{}, {}, { value: number }>, res) => {
        count = req.body.value;
        console.log(` count is now ${count}`);
        res.end('Data recieved successfully');
    });

    app.listen(3000, () => {
        console.log('Started server');
    });
}

export { runServer };
