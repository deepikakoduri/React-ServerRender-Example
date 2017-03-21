const ReactServer = require('react-dom/server'),
    React = require('react'),
    express = require('express'),
    PokeListApp = require('./app/PokeListApp');

var app = new express();

app.use(express.static(`${__dirname}/dist`));

var ReactApp = React.createFactory(PokeListApp);

app.get('/',function(req,res){
  var reactHTML = ReactServer.renderToString(ReactApp());
  res.render('index.ejs',{reactOutput: reactHTML})
})

let port = 8080;

app.listen(port);

console.log('Server is up and running at port : ' + port);
