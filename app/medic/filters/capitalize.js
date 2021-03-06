(function( angular ){
    'use strict';

    angular.module( 'app' ).filter( 'capitalizeFirst', capitalizeFirst );

    function capitalizeFirst(){
        return function( input, all ) {
            var reg = ( all ) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            return ( !!input ) ? input.replace( reg, function( txt ){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
        };
    }

})( angular );
