import connect from "./connect";

connect.query(
  `DROP TABLE users`,
  (err, res) => {
    if(err) {
      console.log('User table dropped failed')
    }
    console.log("User table dropped successfully")
    connect.end();
  }
);
