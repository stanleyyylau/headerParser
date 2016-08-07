var express = require('express');
var app = express();
var useragent = require('useragent');
var requestLanguage = require('express-request-language');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(requestLanguage({
  languages: ['en-US', 'zh-CN'],
  cookie: {
    name: 'language',
    options: { maxAge: 24*3600*1000 },
    url: '/languages/{language}'
  }
}));

app.get('/', function (req, res, next) {
  console.log("You got a request");
  var agent = useragent.parse(req.headers['user-agent']);
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  res.json({
     ipaddress:ip,
     language: req.language,
     software: agent.toString()
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});