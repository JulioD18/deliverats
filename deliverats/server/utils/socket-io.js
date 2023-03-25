import { Server } from 'socket.io';

const io = new Server(undefined, {
  cors: {
    origin: "*"
}});

io.on('connection', (socket) => {
  console.log('a user connected');
});

export default io;
