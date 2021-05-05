import {Pool} from "pg";
require("dotenv").config({path: "../.env"});

const mydatabase = process.env.DATABASE_URL;

const localConnection = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const productionConnection = {
  connectionString: mydatabase,
  ssl: {rejectUnauthorized: false},
};

let connectString = localConnection;

var env = (process.env.NODE_ENV || "dev").trim();

if (env === "dev") {
  connectString = localConnection;
} else {
  connectString = productionConnection;
}

console.log(connectString, "env");

const connect = new Pool(connectString);

connect.on("error", (err, client) => {
  console.error("Error:", err);
});

export default connect;
