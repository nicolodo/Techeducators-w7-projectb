// communication codeReactDatabase Driven Full Stack React & Express App
// // imports
import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

// config
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const db = new pg.Pool({
    connectionString: process.env.DB_CONN,
});

const PORT=8080
app.listen(PORT, () => {
    console.log(`Server is available at: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.status(200).json(
        { message: "You've reached Nicolas's W7 project server"});
});

// Time to CRUD
    let id = 26
    let value = 9000
    let table = "test"
    let column = "number"
//CREATE
app.post("/create", async (req, res) => {
    try {
        const create = await db.query(
            `INSERT INTO test (${column}) VALUES (${value})`
        )
        // const test = (await db.query(`INSERT INTO posts (title, content) VALUES ('cats',"they're the best")`))
        res.send('I have created a new number for your table')
        console.log('I have created a new number for your table')
    } catch {
        res.send('there was a problem inserting into posts')
    }
});

// READ
app.get("/read", async (req, res) => {
    // res.json({message: "You have asked for a number"});
    try {
        // if you forget the extra ()'s it will break.
        const numbers = await db.query(`select * from test
            ORDER BY id`);
        console.log("I'm getting back numbers for you!");
        res.json(numbers.rows);
        // console.log("   Which are:",numbers.rows)
    } catch {
        res.send(`I didn't read it :)`);
    }
});

// UPDATE
app.get("/update", async (req, res) => {

    try {
        const update = await db.query(
            `UPDATE test SET number = (${value}) WHERE id = (${id})`);
        console.log(`I updated id=${id} to ${value}`)
        res.send(`I updated id=${id} to ${value}`)
    } catch {
        res.send(`I didn't update :)`)
    }
});

// DELETE
app.get("/delete", async (req, res) => {
    try {
        const read = await db.query(
            `SELECT from test WHERE id=${id}`
        )
        res.json(read)
        console.log(read.rows)
        const deletion = await db.query(
            // `UPDATE test SET number = (${value}) WHERE id = (${id})`
            `DELETE from test WHERE id=${id}`
        );
        
        console.log(`I deleted id=${id}`)
        
    } catch {
        res.send(`I didn't delete :)`)
    }
});
