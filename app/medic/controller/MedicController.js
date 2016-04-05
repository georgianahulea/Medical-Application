(function( angular ){
    'use strict';

    angular.module( 'app' ).controller( 'MedicController', MedicController );


    function MedicController( $localStorage, $scope, $filter, $stateParams,Medic, Patient ){
        var vm = this;
        vm.input = {};

        if( $localStorage.currentUser && $localStorage.currentUser.docID === $stateParams.id ){
            vm.isMedic = true; //conditions for showing page content
        }


        //------- show all local storage pacients ------
        vm.pacients = $localStorage.users.filter( function ( item ) {
            return item && item.docID === $stateParams.id && item.type === 'pacient' ;
        });

        var localPacients =  function () {
            vm.patientTests = [];
            for (var j = 0, l = vm.pacients.length; j < l; j++) {
                vm.patientTests.push( vm.pacients[j]);
            }
            return vm.patientTests;
        };
        vm.localPacients = localPacients();

        var medicalTests = function () {
            vm.tests = [];
            for(var i = 0, len = vm.localPacients.length; i < len; i++){
                vm.tests.push( vm.localPacients[i]);
            }

            return vm.tests;
        };

        vm.localPacientTests = medicalTests();
        vm.patientObj = new Patient(vm.localPacients, vm.localPacientTests);

        vm.getDoctors = function(){
            if (!$localStorage.doctors) {
                return;
            }
            for ( var i = 0, len = $localStorage.doctors.length; i<len; i++){
                if($localStorage.doctors[i].docID === $stateParams.id){
                    return $localStorage.doctors[i];
                }
            }
        };
        vm.currentDoctor = vm.getDoctors();

        vm.patientOperations = new Medic(vm.currentDoctor);

        vm.addPacient = function() {

            var patientsInput = vm.input;
            vm.addNewPatient = new Medic(vm.currentDoctor);
            vm.addNewPatient.addPatient(patientsInput);
            vm.pacients = $localStorage.users.filter( function ( item ) {
                return item && item.docID === $stateParams.id && item.type === 'pacient' ;
            });
            vm.showForm = false;
            vm.input = {};
        };

        vm.showError = false ;
        vm.showRequiredError = function( field ) {
            if ( $scope.form[ field ].$error.required ) {
                vm.showError = true;
            }
        };
        vm.hideRequiredError = function(){
            vm.showError = false;
        };

        vm.input = {};
        vm.capitalize = function( field ){
            vm.input[ field ] = $filter( 'capitalizeFirst' )( $scope.form[ field ].$viewValue );
        };
        vm.isDisabled = function () {
            return $scope.form.$invalid;
        };
        vm.deletePacient = function ( deleteById ) {
            vm.patientOperations.deletePatient( deleteById );

            vm.pacients =  $localStorage.users.filter( function ( item ) {
                return item && item.docID === $stateParams.id && item.type === 'pacient' ;
            });
            vm.pagination();

        };

        //--- order by ----
        vm.predicate = 'firstname';
        vm.reverse = false;


        vm.order = function( predicate ){
            vm.predicate = predicate;
            vm.reverse = ( vm.predicate === predicate ) ? !vm.reverse : false;
        };

        vm.appointments = $localStorage.appointments;

        vm.deleteAppointment = function ( deleteIds ) {
            vm.deleteID = deleteIds;
            vm.patientObj.deleteAppointments( vm.deleteID );

            vm.pagination();
        };

        vm.pagination = function(){
            vm.pageCount = function () {
                return Math.ceil( $localStorage.appointments.length / vm.itemsPerPage );
            };
            $scope.$watch('vm.currentPage + vm.itemsPerPage', function() {
                var begin = (( vm.currentPage - 1 ) * vm.itemsPerPage ),
                    end = begin + vm.itemsPerPage;

                vm.medicAppointments =$localStorage.appointments.filter( function ( item ) {
                    return item && item.docID === $stateParams.id;
                });
                vm.filteredAppointments = vm.medicAppointments.slice( begin, end );

            });
        };

        vm.totalItems = $localStorage.appointments.length;
        vm.maxSize = 3;
        vm.itemsPerPage = 5;
        vm.currentPage = 1;

        vm.pageCount = function () {
            return Math.ceil( $localStorage.appointments.length / vm.itemsPerPage );
        };
        $scope.$watch('vm.currentPage + vm.itemsPerPage', function() {
            var begin = (( vm.currentPage - 1 ) * vm.itemsPerPage ),
                end = begin + vm.itemsPerPage;

            vm.medicAppointments =$localStorage.appointments.filter( function ( item ) {
                return item && item.docID === $stateParams.id;
            });
            vm.filteredAppointments = vm.medicAppointments.slice( begin, end );
        });

        vm.filterByType = function () {
            return function ( pacient ) {
                return vm.filterAgeCat[pacient.ageCategory];
            };
        };
        vm.filterByGender = function () {
            return function ( pacient ) {
                return vm.gender[pacient.gender];
            };
        };

        vm.filterAgeCat = {
            child : true,
            adult : true,
            senior : true
        };
        vm.gender = {
            feminin : true,
            masculin : true
        };

        vm.passedAppointments = function( appointmentTime ){
            vm.style="";
            vm.time = new Date();
            if ( appointmentTime < vm.time ){
                vm.style = "{'text-decoration':'line-through'}";
            }
        };

    }

})(angular);
