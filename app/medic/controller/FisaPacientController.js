(function( angular ){
 'use strict';

    angular.module( 'app' ).controller( 'FisaPacientController', FisaPacientController );

    function FisaPacientController( $scope , $localStorage, $stateParams, Medic){
        var vm = this;
        vm.consultatie={};
        vm.something= "test";

        for (var i = 0, len = $localStorage.users.length; i < len; i++){
            if($localStorage.users[i].id === $stateParams.id && $localStorage.users[i].docID === $localStorage.currentUser.docID){
                vm.isMedic = true;
            }
        }



        var localPacients = function(){

            for ( var i = 0, len = $localStorage.users.length; i < len; i++ ) {
                var localPacient =  $localStorage.users[i];
                if(localPacient.id === $stateParams.id ){
                    return localPacient;
                }
            }
        };
        vm.localPacients = localPacients();

        vm.localPacientTests = vm.localPacients.analize;
        var getDoctor = function () {
            if (!$localStorage.doctors) {
                return;
            }
            for ( var i = 0, len = $localStorage.doctors.length; i<len; i++){
                if(vm.localPacients.docID === $localStorage.doctors[i].docID){
                    return $localStorage.doctors[i];
                }
            }
        };
        vm.currentDoctor = getDoctor();

        vm.add = function(){
            vm.newTests = new Medic (vm.currentDoctor);
            vm.newTests.addMedicalTest(vm.consultatie);
            vm.localPacientTests = vm.localPacients.analize;
            vm.consultatie = {};
        };
        vm.isDisabled = function () {
            return $scope.form.$invalid;
        };

        vm.showError = false ;

        vm.showRequiredError = function( field ) {
            if ( !vm.consultatie[ field ] ) {
                vm.showError = true ;
            }
        };

        vm.hideRequiredError = function(){
            vm.showError = false;
        };
    }

})( angular );