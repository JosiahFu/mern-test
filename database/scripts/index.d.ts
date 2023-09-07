import Docker from 'dockerode';

export async function buildDockerImage(): void;
export async function startDockerContainer(containerName?: string): Promise<Docker.Container>;
export async function stopDockerContainer(container: Docker.Container): void;
