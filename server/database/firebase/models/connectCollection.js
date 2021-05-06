require("dotenv").config({path: "../.env"});

let env = (process.env.NODE_ENV || "dev").trim();

let collection = process.env.FBASE_COLLECTION;

if (env === "test") {
  collection = process.env.FBASE_COLLECTION_TEST;
} else {
  collection = process.env.FBASE_COLLECTION;
}

export default collection;