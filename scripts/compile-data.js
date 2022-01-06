import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir, writeFile } from 'node:fs/promises';
import { camelCase, set } from 'lodash-es';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

const dataDir = resolve(__dirname, '../data');

let files = await getFiles(dataDir);

files = await Promise.all(
  files.map(async (file) => {
    if (file.split('.').pop() !== 'js') return;

    const { default: data } = await import(file);
    const path = file
      .replace(`${dataDir}/`, '')
      .replace(/\.js/, '')
      .split('/')
      .map(camelCase);

    return {
      data,
      path,
    };
  })
);

files = files.filter((file) => file);

const dataJson = {};
const dataPathsJson = [];

files.forEach(({ data, path }) => {
  set(dataJson, path, data);
  dataPathsJson.push(path.join('.'));
});

await writeFile(
  resolve(__dirname, '../src/data/data.js'),
  `export default ${JSON.stringify(dataJson)};`
);
await writeFile(
  resolve(__dirname, '../src/data/data.json.js'),
  `export default JSON.parse(\`${JSON.stringify(dataJson)}\`);`
);
await writeFile(
  resolve(__dirname, '../src/data/data.json'),
  JSON.stringify(dataJson)
);
// await writeFile(
//   resolve(__dirname, '../src/data/data.paths.json'),
//   JSON.stringify(dataPathsJson)
// );
