
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const db = new pg.Pool({
    connectionString: process.env.DB_CONN,
});

//CREATE
db.query(
    `INSERT INTO test (number) VALUES (1)`
);

// READ
let READ = db.query(
    'SELECT FROM test *'
)
console.log(READ);

