(function( angular ){
    'use strict';

    angular.module( 'app' ).factory( 'Patient', Patient );

    function Patient($localStorage, $stateParams, Guid){

        function PatientInstance (patients, tests) {
            this.id = Guid.make();
            this.docID = $stateParams.id;
            this.username = patients.username;
            this.password = patients.password;
            this.type = "pacient";
            this.firstname = patients.firstname;
            this.lastname = patients.lastname;
            this.gender = patients.gender;
            this.cnp = patients.cnp;
            this.age = patients.age;
            this.ageCategory = patients.ageCategory;
            this.analize = [tests];

        }
        PatientInstance.prototype.getPatient = function () {
            return $localStorage.users;
        };

        PatientInstance.prototype.addAppointment = function(appDate){
            if(!$localStorage.appointments) {
                $localStorage.appointments = [];
            }
           var appointment = $localStorage.appointments;
            appointment.push({
               "appID": Guid.make(),
                "id" : $stateParams.id,
                "firstname" : this.firstname,
                "lastname" :  this.lastname,
                "date" : appDate
            });
        };

        PatientInstance.prototype.deleteAppointments = function(deleteId){
            if(!$localStorage.appointments) {
                $localStorage.appointments = [];
            }
            for (var i = 0, l = $localStorage.appointments.length; i < l; i++){
                var localAppointments = $localStorage.appointments[i];
                if(localAppointments.appID === deleteId ){
                    $localStorage.appointments.splice( i, 1 );
                    break;
                }
            }
        };

        PatientInstance.prototype.getAppointments = function(){
            return $localStorage.appointments;
        };




        return PatientInstance;
    }

})(angular);
