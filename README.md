schiffer-ipsum
===============

Lorum ipsum generator. Pass in a Medium.com author name and a callback and get an array of 5 paragraphs of varying length assembled from random sentences by that author.

###Installation###
````
npm install schiffer-ipsum
````

###Sample usage###
````
var http = require("http")
  , schiffer = require("schiffer-ipsum")
;

var server = http.createServer(function(req, res) {
  schiffer('jennschiffer', function(technoBabble) {
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
      'vary': 'Accept-Encoding'
    });
    res.end('babble('+JSON.stringify(technoBabble)+')');
  });
});

server.listen(3000);
````
