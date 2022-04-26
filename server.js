// const http = require('http');
// const express = require("express");
// // import des chemins
// require('dotenv').config({path: '.env'})
// // import de l'application
// const app = require('./app');
// // import de multer
// const multer = require("multer");
// const mysql = require("mysql2");
// const path = require("path");
//
// // configuration multers.
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public");
//     },
//     filename: function (req, file, cb) {
//         const filename = file.mimetype.includes('image') ? `${file.fieldname}-${Date.now()}.jpg` : `${file.fieldname}-${Date.now()}.mp4`
//         cb(null, filename);
//     },
// });
//
// const upload = multer({ storage: storage });
//
// // create datbase connection
// const dbConn = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
// });
//
// dbConn.connect(function (err) {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log("Database was connected");
//     require("./routes")({ app, dbConn, upload });
//     app.listen(PORT, () => {
//         console.log(`Server is listening on port ${PORT}`);
//     });
// });
//
// const normalizePort = val => {
//     const port = parseInt(val, 10);
//
//     if (isNaN(port)) {
//         return val;
//     }
//     if (port >= 0) {
//         return port;
//     }
//     return false;
// };
//
// // installation du port où l'application va tourner
// const port = normalizePort(process.env.PORT);
// app.set('port', port);
//
// const errorHandler = error => {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges.');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use.');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// };
//
// const server = http.createServer(app);
//
// server.on('error', errorHandler);
// server.on('listening', () => {
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
//     console.log('Listening on ' + bind);
// });
//
// server.listen(port);
