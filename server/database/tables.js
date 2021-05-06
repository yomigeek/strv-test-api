import connect from "./connect";

connect.query(
  ` CREATE TABLE IF NOT EXISTS users (
   
  userid VARCHAR (255) PRIMARY KEY,

  email VARCHAR (255) UNIQUE NOT NULL,

  password VARCHAR (255) NOT NULL,

  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);`,
  (err, res) => {
    if(err) {
      console.log('User migration failed')
    }
    console.log("User Migration completed")
    connect.end();
  }
);
