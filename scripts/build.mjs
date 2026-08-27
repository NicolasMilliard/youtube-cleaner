import { build, context } from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';

const watch = process.argv.includes('--watch');

async function copyStaticFiles() {
  await mkdir('dist/popup', { recursive: true });

  await cp('manifest.json', 'dist/manifest.json');
  await cp('src/popup/popup.html', 'dist/popup/popup.html');
  await cp('src/popup/popup.css', 'dist/popup/popup.css');
}

await rm('dist', { recursive: true, force: true });
await copyStaticFiles();

const options = {
  entryPoints: ['src/popup/popup.ts'],
  bundle: true,
  outfile: 'dist/popup/popup.js',
  target: 'chrome120',
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();

  console.log('Watching TypeScript...');
} else {
  await build(options);
}
