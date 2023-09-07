import { runServer } from 'server';
import { startDockerContainer, stopDockerContainer } from 'database';

const containerName = process.argv[2];

const container = await startDockerContainer(containerName);

runServer();

const onExit = async () => {
    try {
        await stopDockerContainer(container);
    } catch (err) {
        console.err('Failed to stop server: ' + err.message);
    }
    process.exit(0);
};

process.on('SIGINT', onExit);
