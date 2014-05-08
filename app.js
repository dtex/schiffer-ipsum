var request = require("request")
  , libxmljs = require("libxmljs")
  , jsdom = require("jsdom")
;

module.exports = function(author, callback) {

  author = author || 'jennschiffer';

  var babble = [], result = ["", "", "", "", ""];
  request('https://medium.com/feed/@' + author, function (error, response, body) {

    if (error) {

    } else {

      var xmlDoc = libxmljs.parseXml(body)
        , items = xmlDoc.find('//item')
        , postsLoaded = 0
      ;

      items.filter(function (el, i) {
        if (i < 5) return true;
      }).forEach( function(item, index) {

        var link = item.get("link");

        jsdom.env( link.text(), ["http://code.jquery.com/jquery.js"], function (errors, window) {
          postsLoaded++;
          window.$(".section-first p").each( function( ) {
            var thisP = window.$(this).text().split(".").filter(function (el, i) {
              if (el.length < 20) return false;
              if (":".indexOf(el.charAt(el.length-1)) > -1) return false;
              if (el.indexOf("<") > -1) return false;
              return true;
            });
            babble = babble.concat(thisP);
          });
          if (postsLoaded == 5) {
            for (i = 0; i < 5; i++) {
              for (var j = 0, k = getRandomInt(3,5); j < k; j++) {
                var s = getRandomInt(1, babble.length) - 1;
                result[i] = result[i] + babble[s].trim() + '. ';
                babble.splice(s, 1);
              }
            }
              callback(result);
          }
        });
      });
    }
  });
}

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
