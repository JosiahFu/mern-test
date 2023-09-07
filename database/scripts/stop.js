import Docker from 'dockerode';

const docker = new Docker();

async function stopDockerContainer(container) {
    console.log('Stopping container...');
    try {
        await container.stop();
    } catch (err) {
        throw new Error('Error stopping container:', err.message);
    }
    console.log('Stopped container');
}

export { stopDockerContainer };
