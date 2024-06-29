const http = require('http');
const fs = require('fs');
const path = require('path');
const { connectToDatabase } = require('./database/config');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        if (req.method === 'GET') {
            let filePath = '';
            let contentType = '';

            if (req.url === '/') {
                filePath = path.join(__dirname, '../client', 'index.html');
                contentType = 'text/html';
            } else if (req.url.endsWith('.css')) {
                filePath = path.join(__dirname, '../client', req.url);
                contentType = 'text/css';
            } else if (req.url.endsWith('.js')) {
                filePath = path.join(__dirname, '../client', req.url);
                contentType = 'application/javascript';
            } else if (req.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
                filePath = path.join(__dirname, '../client/assets/images', path.basename(req.url));
                contentType = `image/svg+xml`;
            }

            if (filePath) {
                const fileStream = fs.createReadStream(filePath);
                fileStream.on('error', (error) => {
                    console.error(`Error reading ${req.url}:`, error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                });

                res.writeHead(200, { 'Content-Type': contentType });
                fileStream.pipe(res);
                return;
            }
        } else if (req.url === '/submit' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                try {
                    const formData = JSON.parse(body);
                    const db = await connectToDatabase();
                    const result = await db.collection('demo').insertOne(formData);
                    console.log('Form data saved:', result.insertedId);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Form data saved successfully' }));
                } catch (error) {
                    console.error('Error saving form data:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
            });
            return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
