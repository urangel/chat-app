const socketIO = require('socket.io');
const express = require('express');
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('connection established');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} 👍`)
})