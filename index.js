require('marko/node-require'); // Allow Node.js to require and load `.marko` files

global.moment = require('moment');

const Server = require("./src/server");

// server instance
const server = new Server();
// server listining
server.listen(response => {
    console.log(`Server is running ${response.host}:${response.port}`);
});