const handler = require('./handler');

const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    handler.handlerHome(request, response);
  } else if (url.indexOf('/public') !== -1) {
    handler.handlerPublic(request, response, url);
  } else if (url.indexOf('/picture') !== -1) {
    handler.handlerPicture(request, response);
  } else {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.write('<h1> ERR : 404 ! Page Not Found </h1>');
    response.end();
  }
};

module.exports = router;
