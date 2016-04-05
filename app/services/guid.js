(function (angular) {
    'use strict';

    angular.module('app').service('Guid', Guid);

    function Guid () {

        return {
            make : function () {
                return ("0000" + ( Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
            }
        };
    }

}(angular));