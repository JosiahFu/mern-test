import Docker from 'dockerode';

const docker = new Docker();

async function stopDockerContainer(container) {
    try {
        console.log(`Stopping container...`);
        await container.stop();
    } catch (err) {
        console.error('Error stopping container:', err.message);
    }
}

export { stopDockerContainer };
