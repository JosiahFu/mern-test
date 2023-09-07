import Docker from 'dockerode';
import 'dotenv/config';
import path from 'path';

const docker = new Docker();

async function buildDockerImage() {
    try {
        await docker.buildImage(
            {
                context: path.join(
                    path.dirname(new URL(import.meta.url).pathname),
                    '..'
                ),
                src: ['Dockerfile'],
            },
            { t: process.env.IMAGE_NAME },
            (err, stream) => {
                if (err) {
                    console.error('Error building Docker image:', err);
                    return;
                }

                // Print build process
                stream.on('data', chunk => {
                    process.stdout.write(JSON.parse(chunk)?.stream ?? '');
                });

                stream.on('end', () => {
                    console.log('Docker image build complete.');
                });
            }
        );
    } catch (err) {
        console.error('Error:', err.message);
    }
}

export { buildDockerImage };
