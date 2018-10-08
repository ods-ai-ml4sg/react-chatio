import express from 'express';
import http from 'http';
import compression from 'compression';
import path from 'path'

// runtime variables
const port = process.env.PORT || 8080;
const logfile = process.env.LOGFILE || null;
const loglevel = process.env.LOGLEVEL || "DEBUG";

const app = express();
const server = http.Server(app);

// Initialize socket.io once we created http server
import WebSocket from './Socket'
const websocket = WebSocket(server);

// Serve static files
app.use(compression({}));
app.use('/static', express.static(path.join('build/static')));
app.use('*', function(req, res) {
  res.sendFile('index.html', {root: path.join('build/')});
});

// Handle ctrl+c
process.on('SIGINT', function() {
  process.exit();
});

server.listen(port, () => console.log(`[INFO] Listening on port ${port}`));

// const getAsyncAwaitExample = async socket => {
//   try {
//     const res = await get();
//     socket.emit("event", res.data);
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };
