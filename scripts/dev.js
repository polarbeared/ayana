import { spawn } from 'node:child_process';

const processes = [];

const isWindows = process.platform === 'win32';

function run(name, command, args, options = {}) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: isWindows,
    ...options,
  });

  processes.push({ name, child });

  child.on('exit', (code, signal) => {
    console.log(`\n${name} exited with code ${code}${signal ? ` (signal: ${signal})` : ''}`);
    shutdown(code ?? 0);
  });

  child.on('error', (error) => {
    console.error(`${name} failed to start:`, error);
    shutdown(1);
  });

  return child;
}

function shutdown(exitCode = 0) {
  processes.forEach(({ child }) => {
    if (child.exitCode === null) {
      if (isWindows) {
        spawn('taskkill', ['/pid', child.pid, '/f', '/t']);
      } else {
        child.kill('SIGTERM');
      }
    }
  });

  setTimeout(() => {
    process.exit(exitCode);
  }, 100);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

console.log('🚀 Starting Ayana local development environment...');

run('backend', 'node', ['server/server.js'], {
  env: {
    ...process.env,
    VERCEL: process.env.VERCEL ?? '0',
  },
});

run('frontend', 'npm', ['run', 'dev:client'], {
  env: process.env,
});
