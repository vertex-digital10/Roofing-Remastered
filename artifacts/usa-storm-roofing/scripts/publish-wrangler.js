#!/usr/bin/env node
import { spawn } from 'child_process';

const token = process.env.CF_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error('Error: CF_API_TOKEN (Cloudflare API token) not set.\nCreate a scoped API token in Cloudflare and set CF_API_TOKEN as an environment variable before running this script.');
  process.exit(1);
}

const args = ['wrangler', 'pages', 'deploy', './dist', '--project-name=usa-storm-roofing', '--branch=main'];

// Pass the token via environment to avoid interactive OAuth
if (token === 'PASTE_YOUR_TOKEN_HERE' || token.trim().length < 20) {
  console.error('Error: CF_API_TOKEN looks like a placeholder or is too short. Set a valid token and try again.');
  process.exit(1);
}

const child = spawn('npx', args, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    CLOUDFLARE_API_TOKEN: token,
    CF_API_TOKEN: token,
  },
});

child.on('close', (code) => {
  process.exit(code);
});
