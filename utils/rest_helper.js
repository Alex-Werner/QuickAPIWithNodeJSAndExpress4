require( "./inherits.js" );

/**
 * @class CheetahNode.RestUtils
 * @extends Object
 *
 * API rest
 *
 */
var RestUtils = Object.subClass( {
    /**
     * Constructeur
     */
    init: function ( ) {},

    /**
     * Positionne le header de la response HTTP
     *
     * @param {String} type.
     * @param {} response.
     * @return {Deferred.promise}.
     */
    setResponseHeader: function ( type, response ) {
        if ( type === 'text/plain' )
            response.setHeader( 'Content-Type', 'text/plain; charset=utf-8' );
        else if ( type === 'application/json' )
            response.setHeader( 'Content-Type', 'application/json; charset=utf-8' );
        else
            console.err( "Header <%s> non reconnue !", type );
    },

} );

// Export du module
module.exports = new RestUtils( );