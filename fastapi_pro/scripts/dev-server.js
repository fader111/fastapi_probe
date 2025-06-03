import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start Frontend (Vite)
const frontend = spawn('npm', ['run', 'dev'], {
    shell: true,
    stdio: 'inherit'
});

// Start Backend (FastAPI)
const backend = spawn('C:\\Python312\\python.exe', ['-m', 'uvicorn', 'main:app', '--reload'], {
    shell: true,
    stdio: 'inherit',
    cwd: join(__dirname, '..', 'server')
});

// Handle process termination
process.on('SIGINT', () => {
    frontend.kill();
    backend.kill();
    process.exit();
});