const socketIO = require('socket.io');
const express = require('express');
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT);
const io = socketIO.listen(server);
const cors = require('cors');

io.on('connection', socket => {
  console.log('connection established');
  socket.on('chat-message', msg => {
    console.log('message: ' + msg );
    io.emit('chat-message', msg);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});

// io.emit('connection-message', socket => {
//   socket.broadcast.emit('Please be nice to each other ✌');
// })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}