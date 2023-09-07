import express from 'express';
import path from 'path';

function runServer() {
    const app = express();

    app.use(express.static(path.join(
        path.dirname(new URL(import.meta.url).pathname),
        'client/dist'
    )
    ));

    app.listen(3000, () => {
        console.log('Started server');
    });
}

export { runServer };
