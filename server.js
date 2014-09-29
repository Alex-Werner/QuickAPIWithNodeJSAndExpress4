var express = require('express');
var bodyParser = require('body-parser');

var config = require('./conf/conf.js');
var restUtils = require('./utils/rest_helper.js');
var route_root = require('./routes/root.js');

/**
 * @class Cheetah.Server
 * @extends Object
 *
 * Launch a REST server on port.
 *
 */
 
var Server = Object.subClass({
	/**
	 * Constructor
	 */
	 init:function(){
		this.r = express();
		
		this.setup();
		
	 },
	 /**
	  * URL Config
	  */
	 setup: function(){
		var r = this.r;
		var that = this;
		
		r.use('/static',express.static(__dirname+'/public'));
		r.use('/www', express.static(__dirname+'www'));
		
		r.use(bodyParser.urlencoded({ extended: true }));
		r.use(bodyParser.json());
		/* GET ROUTES */
		
		r.get('/helloroot',route_root.root);
		r.get('/hellojson',route_root.hellojson);
		
		/* POST ROUTES */
		r.post('/hellopost',route_root.hellopost);
		
		r.use(function(req,res,next){
			restUtils.setResponseHeader('text/plain',res);
			res.status(404).send('Page not found :(');
		});
	 },
	 /**
	  * Listener HTTP
	  */
	 listen:function(){
		var port = config.rest.port;
		console.log('Server actually running on port:' + port);
		this.r.listen(port);
	 }
});

module.exports = new Server();