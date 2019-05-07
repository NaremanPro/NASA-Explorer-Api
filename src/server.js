const http = require('http');
const router = require('./router');

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

http.createServer(router).listen(port, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});
