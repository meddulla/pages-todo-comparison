import { cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('./dist', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL('../src', import.meta.url), output, { recursive: true });
await mkdir(new URL('./dist/data', import.meta.url), { recursive: true });
await cp(
  new URL('../data/projects.json', import.meta.url),
  new URL('./dist/data/projects.json', import.meta.url),
);
console.log('Native modules copied to native/dist');
