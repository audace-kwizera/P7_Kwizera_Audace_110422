require('dotenv').config();
const mysql = require('mysql2');
// import des chemins
const dbConn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

dbConn.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("Database was connected");
  require("./routes")({ app, dbConn, upload });
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
module.exports = dbConn.promise();

