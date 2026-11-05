// Builds build/index.html (unencrypted) from src/app.html + songs/*.json.
// The deploy workflow then encrypts it with StatiCrypt into dist/.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, cpSync } from 'node:fs';

const order = JSON.parse(readFileSync('songs/_order.json', 'utf8'));
const songs = readdirSync('songs')
  .filter(f => f.endsWith('.json') && !f.startsWith('_'))
  .map(f => ({ slug: f.replace(/\.json$/, ''), ...JSON.parse(readFileSync(`songs/${f}`, 'utf8')) }))
  .sort((a, b) => {
    const ia = order.indexOf(a.slug), ib = order.indexOf(b.slug);
    return (ia < 0 ? 1e9 : ia) - (ib < 0 ? 1e9 : ib) || a.title.localeCompare(b.title);
  });

for (const s of songs) {
  const ids = new Set(s.sections.map(x => x.id));
  for (const st of s.structure) if (!ids.has(st.id)) throw new Error(`${s.slug}: structure uses unknown section "${st.id}"`);
}

const version = new Date().toISOString();
const html = readFileSync('src/app.html', 'utf8')
  .replace('/*SONGS*/[]', JSON.stringify(songs).replace(/</g, '\\u003c'))
  .replace('/*VERSION*/', version);
mkdirSync('build', { recursive: true });
writeFileSync('build/index.html', html);
cpSync('public', 'build', { recursive: true });
writeFileSync('build/version.json', JSON.stringify({ version }));
console.log(`build/index.html — ${songs.length} temas`);
