import Docker from 'dockerode';
import 'dotenv/config';

const docker = new Docker();

async function startDockerContainer(containerName) {
    if (!containerName) {
        console.log(
            'No container name provided. Starting an unnamed container...'
        );
    }

    try {
        // Check if the container with the given name exists
        const containers = await docker.listContainers({ all: true });
        const existingContainer =
            containerName &&
            containers.find(containerInfo => {
                return containerInfo.Names.includes('/' + containerName);
            });

        if (existingContainer) {
            console.log(
                `Container "${containerName}" already exists. Starting it...`
            );
            const container = docker.getContainer(existingContainer.Id);
            await container.start();
            return container;
        } else {
            console.log(
                `Container "${
                    containerName ?? 'unnamed-container'
                }" does not exist. Creating and starting a new container...`
            );
            const container = await docker.createContainer({
                Image: process.env.IMAGE_NAME, // You can specify a different image if needed
                name: containerName, // Set Name to undefined for an unnamed container
                HostConfig: {
                    PortBindings: {
                        '27017/tcp': [{ HostPort: '27107' }],
                    },
                },
            });
            await container.start();
            return container;
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}

export { startDockerContainer };
