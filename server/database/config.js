const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = `${process.env.DATABASE_URL}`;

async function connectToDatabase() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('figma-design-replication-database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToDatabase };