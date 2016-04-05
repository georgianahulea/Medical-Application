( function( angular ){
    'use strict';

    angular.module( 'app' ).factory( 'Medic', Medic );

    function Medic ($localStorage, Guid, Patient, $stateParams) {

        function MedicInstance (medic) {
            this.docID = Guid.make();
            this.username = medic.username;
            this.password = medic.password;
            this.firstname = medic.firstname;
            this.lastname = medic.lastname;
            this.gender = medic.gender;
            this.cnp = medic.cnp;
            this.age = medic.age;
            this.specialties = medic.specialties;
        }

        MedicInstance.prototype.addMedic = function () {

            if(!$localStorage.doctors) {
                $localStorage.doctors = [];
            }

            var allMedics = $localStorage.doctors;
            allMedics.push(this);

        };

        MedicInstance.prototype.addPatient = function (patientInput) {

            if(!$localStorage.users) {
                $localStorage.users = [];
            }

            var allPatients = $localStorage.users;
            var analize = {"data" : patientInput.data,
                            "disease" : patientInput.disease,
                            "detalii": patientInput.detalii
                            };
            var newPatient = new Patient(patientInput, analize);
            allPatients.push(newPatient);
        };

        MedicInstance.prototype.getMedics = function () {
            return $localStorage.doctors;
        };

        MedicInstance.prototype.getPatients = function () {
            return $localStorage.users;
        };

        MedicInstance.prototype.deletePatient = function (deleteById) {

            if(!$localStorage.users) {
                $localStorage.users = [];
            }

            if(!$localStorage.appointments) {
                $localStorage.appointments = [];
            }

            for (var i = 0, len = $localStorage.users.length; i < len; i++) {
                var localPacient = $localStorage.users[i];
                if (localPacient.id === deleteById) {
                    $localStorage.users.splice(i, 1);
                    break;
                }
            }
            var appointments = [];

            for ( var y = 0, l = $localStorage.appointments.length; y < l; y++ ) {
                var localAppointments = $localStorage.appointments[y];

                if (localAppointments && localAppointments.id !== deleteById) {
                    appointments.push(localAppointments);
                }
            }

            $localStorage.appointments = appointments;
        };

        MedicInstance.prototype.addMedicalTest = function (analize) {

            if(!$localStorage.users) {
                $localStorage.users = [];
            }

            for (var i = 0, len = $localStorage.users.length; i < len; i++){
                if($localStorage.users[i].id === $stateParams.id){
                    var patientTests = $localStorage.users[i].analize;
                    patientTests.push(analize);
                }
            }

        };

        return MedicInstance;
    }

})(angular);