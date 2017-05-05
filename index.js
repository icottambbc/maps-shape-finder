// 3rd party
var express = require('express');
var app = express();

// serves all the static files
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/*', function(req, res){ 
  res.sendFile(__dirname + '/index.html');
});

// specifiy port to listen to
app.set('port', process.env.PORT || 3002);

// listen
app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});