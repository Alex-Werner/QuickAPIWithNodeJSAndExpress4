var marked = require( "marked" );

marked.setOptions( {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
} );


/**
 * Transform a Github Flavored Markdown text to HTML.
 * @param {String} text Mandatory text to be converted.
 * @param {Function} callback Allows async usage.
 * @param {TypeError} callback.err Error if any
 * @param {String} callback.content HTML result
 */

function toHTML( text ) {
    if ( !text )
        return "";

    return marked( text );
}

/**
 * Parse an object searching for String instances. Each instance which contains markdown syntax is processed and replaced.
 */

function parse( object ) {
    var keys;
    try {
        keys = Object.keys( object );
    }
    catch ( e ) {
        return object;
    }
    keys.forEach( function ( key ) {
        var value = object[ key ];
        if ( Object.prototype.toString.call( value ) === "[object Object]" ) {
            object[ key ] = parse( value );
        }
        else if ( typeof ( value ) === "string" ) {
            object[ key ] = toHTML( value );
        }
    } );
    return object;
}

module.exports = {
    toHTML: toHTML,
    parse: parse
};