const http = require('http');
const fs = require('fs');
const path = require('path');
const { connectToDatabase } = require('./database/config');
require('dotenv').config();

const PORT = process.env.PORT || 3000;


const server = http.createServer(async (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        try {
            const filePath = path.join(__dirname, '../client', 'index.html');
            const fileStream = fs.createReadStream(filePath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fileStream.pipe(res);
        } catch (error) {
            console.error('Error serving index.html:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else if (req.url.endsWith('.css') && req.method === 'GET') {
        try {
            const cssPath = path.join(__dirname, '../client', req.url);
            const cssStream = fs.createReadStream(cssPath);
            res.writeHead(200, { 'Content-Type': 'text/css' });
            cssStream.pipe(res);
        } catch (error) {
            console.error(`Error serving ${req.url}:`, error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else if (req.url.endsWith('.js') && req.method === 'GET') {
        try {
            const jsPath = path.join(__dirname, '../client', req.url);
            const jsStream = fs.createReadStream(jsPath);
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            jsStream.pipe(res);
        } catch (error) {
            console.error(`Error serving ${req.url}:`, error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else if (req.url.match(/\.(jpg|jpeg|png|gif|svg)$/) && req.method === 'GET') {
        try {
            const imagePath = path.join(__dirname, '../client', req.url);
            const imageStream = fs.createReadStream(imagePath);
            res.writeHead(200, { 'Content-Type': `image/${path.extname(imagePath).substring(1)}` });
            imageStream.pipe(res);
        } catch (error) {
            console.error(`Error serving ${req.url}:`, error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else if (req.url === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
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
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

