var express = require( 'express' );

var restUtils = require( "../utils/rest_helper.js" );

module.exports = function ( ) {
    var app = express( );

    app.root = function ( req, res ) {
        restUtils.setResponseHeader( 'text/plain', res );
        res.end( "Hello ROOT" );
    };

    app.helloworld = function ( req, res ) {
        restUtils.setResponseHeader( 'text/plain', res );
        res.end( "Hello WORLD" );
    };

    app.hellojson = function ( req, res ) {
        restUtils.setResponseHeader( 'application/json', res );
        var result = {
            name: "response",
            value: "hello json"
        };
        res.end( JSON.stringify( result ) );
    };
	app.hellopost = function ( req, res ) {
        restUtils.setResponseHeader( 'application/json', res );
        var result = {
            name: "response",
            name: "response",
            value: "hello json"
        };
        res.end( JSON.stringify( result ) );
    };

    return app;
}( );