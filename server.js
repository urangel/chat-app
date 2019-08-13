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
  socket.on('chat-message', (userName, input) => {
    console.log('message: ' + input );
    io.emit('chat-message', userName, input);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});



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