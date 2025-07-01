const express = require('express');
const { Pool } = require('pg')

const app = express();
app.use(express.json());

const db = new Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/postgres"
});

async function connectToDb() {
    console.log('Connecting to DB');
    try{
        await db.connect()
        app.listen(3000, () => console.log('Server on port 3000'));    
    } catch(e){
        console.log('Failed to connect to DB: ', e);
    }
}


app.get('/', async (req, res) => {

    try {
        const result = await db.query('SELECT NOW()');
        res.send(`PostgreSQL time: ${result.rows[0].now}`);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database connection failed');
    }
});


connectToDb();