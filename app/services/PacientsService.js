/*global console*/

(function( angular ){
    'use strict';

    angular.module( 'app.pacient' ).factory( 'PacientsService', PacientsService );

    function PacientsService( $http , $stateParams, $q, $localStorage, Guid){

        var service = {
            pacients : [],
            getData : function () {
                var self = this;
                if (this.pacients.length) {
                    var def = $q.defer();
                    def.resolve(this.pacients);
                    return def.promise;
                }
                return $http({ method: 'GET', url: 'pacient/pacienti.json' })
                    .then(function(result){
                        self.pacients = result.data;
                        return result.data;
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            },
            getOne : function () {
                var getPacient = function (pacients) {
                    for ( var i= 0, len = pacients.length; i < len; i++ ){
                        if ( pacients[i].id === $stateParams.id ){
                            return pacients[i];
                        }
                    }
                };
                return this.getData().then(getPacient);
            },

            /*addDetails : function(details){
                var getDetail = function () {

                    storedMedicalTests.push({
                        id : $stateParams.id,
                        analize:[{
                            data: details.data,
                            disease: details.disease,
                            detalii: details.detalii
                        }]
                    });
                    $localStorage.medicalTests = storedMedicalTests;
                };
                return this.getOne().then(getDetail);
            },*/
            //concat all analize to show them
            /*getAllTests : function() {
                var originalTests = getAll();
                console.log(originalTests);
                var addedTests = getById();
                console.log(addedTests);
                var allTests = originalTests.concat(addedTests);
                return allTests;
            },*/
            // get all pacients from localstorage
         /*   getPacientData : function(){
                for ( var i = 0, len = $localStorage.users.length; i < len; i++ ) {
                    var localPacient =  $localStorage.users[i];
                    if(localPacient.id === $stateParams.id ){
                        return localPacient;
                    }
                }
            },*/
            /*maxJsonIds : function () {
             var jsonPacientId = [];
             var maxJsonId = function(data) {
             for (var i = 0, len = data.length; i < len; i++) {
             var idArray = data[i];
             jsonPacientId = jsonPacientId.concat(idArray.id);
             }
             return Math.max.apply(null, jsonPacientId);
             };
             return this.getData().then(maxJsonId);
             },
             getCurrentId : function(maxJson){
             var maxStored = maxStoredId();
             return Math.max(maxJson, maxStored);
             },*/
         /*   addPacientData : function (maxId, storedPacients, pacientsInput) {
                storedPacients.push({
                    id: Guid.make(),
                    docID: $stateParams.id,
                    username: pacientsInput.username,
                    password: pacientsInput.parola,
                    type: "pacient",
                    firstname: pacientsInput.nume,
                    lastname: pacientsInput.prenume,
                    gender : pacientsInput.gender,
                    cnp : pacientsInput.cnp,
                    age: pacientsInput.age,
                    ageCategory: pacientsInput.ageCategory,
                    analize: [{
                        data: pacientsInput.data,
                        disease: pacientsInput.disease,
                        detalii: pacientsInput.detalii
                    }]
                });

                $localStorage.users = storedPacients;

            }*/
            /* removePacient : function ( deleteById ) {
             for ( var i = 0, len = $localStorage.users.length; i < len; i++ ) {
             var localPacient  = $localStorage.users[i];
             if ( localPacient.id === deleteById ){
             $localStorage.users.splice( i, 1 );
             break;
             }
             }
             for ( var x = 0, length = $localStorage.medicalTests.length; x < length; x++ ) {
             var localAnalize  = $localStorage.medicalTests[x];
             if( localAnalize.id === deleteById ){
             $localStorage.medicalTests.splice( x, 1 );
             }
             }

             for ( var y = 0, l = $localStorage.appointments.length; y < l; y++ ){
             var localAppointments = $localStorage.appointments[y];
             if ( localAppointments.id === deleteById ){
             $localStorage.appointments.splice( y, 1 );
             }
             }
             }*/
        };

        service.getData();
        return service;

        /*------------ private hepler methods ------ */

        function getById () {
            //return one single array of analyzes for one pacient
            var pacientTests = [];
            for  ( var i = 0, len = $localStorage.medicalTests.length; i < len; i++ ) {
                var storedMedicalTests = $localStorage.medicalTests[i];
                if( storedMedicalTests.id === $stateParams.id ) {
                    pacientTests = pacientTests.concat( storedMedicalTests.analize );
                }
            }
            return pacientTests;
        }

        function getAll () {
            //get array of analize din pacienti
            var tests = [];
            for  ( var i = 0, len = $localStorage.users.length; i < len; i++ ) {
                var storedPacients = $localStorage.users[i];
                if( storedPacients.id === $stateParams.id ) {
                    tests = storedPacients.analize;
                    break;
                }
            }
            return tests;
        }

        /* function maxStoredId(){
         //id pac din fisier, id pac din local storage
         // compare, return care e mai mare
         var maxId = [];
         for  ( var i = 0, len = $localStorage.users.length; i < len; i++ ) {
         var storedMedicalTests = $localStorage.users[i];
         maxId = maxId.concat(storedMedicalTests.id);
         }
         return Math.max.apply( null, maxId );
         }*/
    }

})( angular );