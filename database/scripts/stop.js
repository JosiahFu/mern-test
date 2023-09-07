import Docker from 'dockerode';

const docker = new Docker();

async function stopDockerContainer(container) {
    console.log('Stopping container...');
    await container.stop();
    console.log('Stopped container');
}

export { stopDockerContainer };
