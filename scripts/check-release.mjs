import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'site.config.json'),'utf8'));
const remote=spawnSync('git',['remote','get-url','origin'],{cwd:root,encoding:'utf8'});
const remoteUrl=remote.stdout.trim().replace(/\.git$/,'');
if(remote.status!==0||!remoteUrl.endsWith(`/${config.repository}`))throw new Error(`Wrong source repository for ${config.appName}`);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!html.includes(`<title>${config.appName}</title>`))throw new Error(`Wrong page title for ${config.appName}`);
console.log(`TARGET ${config.appName} · ${config.repository} · ${config.vercelProject}`);
const commands=[
  [process.execPath,['scripts/prepare-release.mjs','--check']],
  [process.execPath,['scripts/validate-trip.mjs']],
  ...['app.js','sw.js','data/trips.js'].map(file=>[process.execPath,['--check',file]]),
  ['git',['diff','--check']]
];
for(const [command,args] of commands){
  const result=spawnSync(command,args,{cwd:root,stdio:'inherit'});
  if(result.error)throw result.error;
  if(result.status!==0)process.exit(result.status||1);
}
console.log('OK: release checks passed');
