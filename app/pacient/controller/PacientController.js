(function( angular ){
    'use strict';

    angular.module( 'app.pacient' ).controller( 'PacientController', PacientController );

    function PacientController( $localStorage, $stateParams, $scope, Guid, Patient ){
        var vm = this;
        vm.localAnalize = $localStorage.analize;

        var localPacients = function(){
            for ( var i = 0, len = $localStorage.users.length; i < len; i++ ) {
                var localPacient =  $localStorage.users[i];
                if(localPacient.id === $stateParams.id ){
                    return localPacient;
                }
            }
        };
        vm.localPacients = localPacients();

        var medicalTests = function () {
            vm.tests = [];
            for(var i = 0, len = vm.localPacients.analize.length; i < len; i++){
                vm.tests.push(vm.localPacients.analize[i]);
            }
            return vm.tests;
        };
        vm.localPacientTests = medicalTests();

        if( $localStorage.currentUser.id === $stateParams.id){
            vm.isPacient = true;
        }


        // Appointment date-picker
        vm.appDate = "";
        vm.today = function(){
            vm.appDate = new Date();
        };
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[2];
        vm.altInputFormats = ['M!/d!/yyyy'];

        vm.popup = {
            opened: false
        };
        vm.open = function() {
            vm.popup.opened = true;
        };

        vm.setDate = function() {
          vm.appDate = new Date();
        };
        vm.isDisabled = function () {
            return $scope.form.$invalid;
        };
        vm.appointmentsStorage = $localStorage.appointments;

        vm.newPatient  = new Patient(vm.localPacients, vm.tests);

        vm.setAppointment = function(){
            vm.newPatient.addAppointment(vm.appDate);
            vm.appointments = $localStorage.appointments.filter( function ( item ) {
                return item && item.id === $stateParams.id;
            });
            vm.appDate = "";
        };

        vm.appointments = vm.appointmentsStorage;

        vm.deleteAppointment = function(deleteId){
            vm.newPatient.deleteAppointments(deleteId);
            vm.appointments = $localStorage.appointments.filter( function ( item ) {
                return item && item.id === $stateParams.id;
            });
        };

        vm.appointments = $localStorage.appointments.filter( function ( item ) {
            return item && item.id === $stateParams.id;
        });
    }
})( angular );