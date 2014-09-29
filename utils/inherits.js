if ( module.exports.inherits )
  return;

module.exports.inherits = "loaded";

/**
 * Allows writing of pseudo classes as in POO languages.
 * var Parent = Object.subClass({
 *    // constructor called automatically when doing new MonObjet()
 *    init: function(name) {
 *      this.name = name
 *    },
 *      someFunc: function(){
 *      //
 *    }
 * })
 * var Child = Parent.subClass({
 *    // constructor called automatically when doing new MonObjet()
 *    init: function(name) {
 *      this._super(name)
 *    },
 *      otherFunc: function(){
 *      this.someFunc()
 *    }
 * })
 * var child = new Child("Bobby")
 */
( function ( ) {

  var initializing = false,
    superPattern = /xyz/.test( function ( ) {
      xyz;
    } ) ? /\b_super\b/ : /.*/;

  Object.subClass = function ( properties ) {

    var _super = this.prototype;

    initializing = true;
    var proto = new this( );
    initializing = false;

    for ( var name in properties ) {

      proto[ name ] = typeof properties[ name ] == "function" && typeof _super[ name ] == "function" && superPattern.test( properties[ name ] ) ?
        ( function ( name, fn ) {
        return function ( ) {
          var tmp = this._super;
          this._super = _super[ name ];
          var ret = fn.apply( this, arguments );
          this._super = tmp;
          return ret;
        };
      } )( name, properties[ name ] ) : properties[ name ];
    }

    function Class( ) {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply( this, arguments );
    }

    Class.prototype = proto;

    Class.constructor = Class;

    Class.subClass = arguments.callee;

    return Class;
  };
} )( );