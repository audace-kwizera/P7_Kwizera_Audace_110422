const http = require('http');
// import de l'application
const app = require('./app');

// installation du port où l'application va tourner
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);