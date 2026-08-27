import chokidar from 'chokidar';
import { build, context } from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';

const watch = process.argv.includes('--watch');

const staticFiles = [
  ['manifest.json', 'dist/manifest.json'],
  ['src/popup/popup.html', 'dist/popup/popup.html'],
  ['src/popup/popup.css', 'dist/popup/popup.css'],
  ['src/content/content.css', 'dist/content/content.css'],
];

async function copyStaticFile(source, destination) {
  await mkdir(destination.substring(0, destination.lastIndexOf('/')), {
    recursive: true,
  });

  await cp(source, destination);
}

async function copyStaticFiles() {
  await Promise.all(
    staticFiles.map(([source, destination]) => copyStaticFile(source, destination)),
  );
}

await rm('dist', { recursive: true, force: true });
await copyStaticFiles();

const options = {
  entryPoints: {
    'popup/popup': 'src/popup/popup.ts',
    'content/index': 'src/content/index.ts',
  },
  bundle: true,
  outdir: 'dist',
  target: 'chrome120',
};

if (watch) {
  const ctx = await context(options);

  await ctx.watch();

  chokidar.watch(staticFiles.map(([source]) => source)).on('change', async (changedFile) => {
    const staticFile = staticFiles.find(([source]) => source === changedFile);

    if (!staticFile) {
      return;
    }

    const [source, destination] = staticFile;

    await copyStaticFile(source, destination);

    console.log(`Copied ${source}`);
  });

  console.log('Watching TypeScript and static files...');
} else {
  await build(options);
}
