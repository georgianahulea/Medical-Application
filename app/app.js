( function ( angular ) {
    'use strict';

    var app = angular.module( 'app', [ 'ngAnimate', 'ui.bootstrap' , 'ngStorage', 'ui.router', 'app.pacient', 'app.medic' ] );

    app.config( function( $stateProvider, $urlRouterProvider ){
        $stateProvider
            .state( 'index', {
                url :'/',
                controller : 'HomeController',
                templateUrl : 'login.view.html',
                controllerAs : 'vm'
            })
            .state( 'login',{
                url : '/login',
                controller : 'HomeController',
                templateUrl : 'login.view.html',
                controllerAs : 'vm'
            })
            .state( 'register',{
                url : '/register',
                controller : 'HomeController',
                templateUrl : 'register.view.html',
                controllerAs : 'vm'
            })
            .state( 'medic',{
                url : '/medic/:id',
                controller : 'MedicController',
                templateUrl : '/app/medic/view/medic.view.html',
                controllerAs : 'vm'
            })
            .state( 'fisa-pacient',{
                url : '/fisa-pacient/:id',
                controller : 'FisaPacientController',
                templateUrl : '/app/medic/view/fisa-pacient.view.html',
                controllerAs : 'vm'
            })
            .state( 'pacient',{
                url : '/pacient/:id',
                controller : 'PacientController',
                templateUrl : '/app/pacient/view/pacient.view.html',
                controllerAs : 'vm'
            });

        $urlRouterProvider.otherwise( '/login');
    });



})( angular );




