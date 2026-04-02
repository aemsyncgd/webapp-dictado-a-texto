import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const server = createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = join(process.cwd(), filePath);
    
    if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end('404 Not Found');
        return;
    }
    
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    try {
        const content = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (e) {
        res.writeHead(500);
        res.end('500 Internal Server Error');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
