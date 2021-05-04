import connect from "./connect";

const createTable = () => {
  const query = `
                
          CREATE TABLE IF NOT EXISTS users (
   
              userid VARCHAR (255) PRIMARY KEY,

              email VARCHAR (255) UNIQUE NOT NULL,

              password VARCHAR (255) NOT NULL,
   
              createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
   
          );

      `;

  connect.query(query, (err) => {
    if (err) {
      return err.message;
    }
    connect.end();
  });
};

createTable();
