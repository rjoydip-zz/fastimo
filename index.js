const Server = require("./src");

// server instance
const server = new Server();
// server listining
server.listen().then((response) => {
    console.log(`Server is running ${response.host}:${response.port}`);
}).catch((err) => {
    console.log(err);
});