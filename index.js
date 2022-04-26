/** Importation d'Express */
const express = require("express");
/** Importation de .env*/
require("dotenv").config();
const cors = require("cors");
/** Importation de multer*/
const multer = require("multer");
const mysql = require("mysql2");
/** Importation de node */
const path = require("path");
/** Importation du port */
const PORT = process.env.PORT || 8080;
/** Importation bodyParser */
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Autorisation cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// configuration de multers.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const filename = file.mimetype.includes('image') ? `${file.fieldname}-${Date.now()}.jpg` : `${file.fieldname}-${Date.now()}.mp4`
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Création de la connexion avec la base de données
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
