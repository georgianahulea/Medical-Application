(function ( angular ) {
    'use strict';

    angular.module( 'app' ).controller( 'HomeController', HomeController );

    function HomeController( $localStorage, $state, Medic, $filter, $scope ) {
        var vm = this;
        vm.isMedic = false;
        vm.isPacient = false;
        vm.input = {};
        vm.error = "";

        var doctors =[{
                docID : "1",
                firstname : "SomeName",
                lastname : "SomeOtherName",
                username : "doc",
                password : "123",
                specializare : "ORL"
            }, {
                docID : "2",
                firstname : "SecondName",
                lastname : "SomeOtherSecondName",
                username : "docTwo",
                password : "sdasAAAAA",
                specializare : "cardiologie"
            }
        ];
        var appointments = [{
                "appID": "54",
                id : "10",
                docID : "1",
                time : "10:00",
                date : "2016-12-30",
                firstname : "Hulea",
                lastname : "Georgiana"
            }, {
                "appID": "4",
                id : "5",
                docID : "2",
                time : "10:00",
                date : "2016-12-30",
                firstname : "Text",
                lastname : "Georgiana"
            }];
        var userData = [
            {
                id : "10",
                docID : "1",
                username : "user-pacient",
                password : "123456",
                type : "pacient",
                firstname : "Hulea",
                lastname : "Georgiana",
                age : "12",
                gender : "feminin",
                ageCategory : "child",
                analize : [{
                    data : "12.09.2015",
                    disease : "boala1",
                    detalii : "text, looooooooooong text"

                },
                    {
                        data : "10.09.2015",
                        disease : "boala1",
                        detalii : "second row. hurray."

                    }]
            },
            {
                id : "9",
                docID :"2",
                username : "paciedasfa",
                password : "12344444456",
                type : "pacient",
                firstname : "Ana",
                lastname : "Anusca",
                age : "56",
                gender : "masculin",
                ageCategory : "senior",
                analize : [{
                    data : "13.10.2015",
                    disease : "boala2",
                    detalii : "description text, haha"
                }]
            },
            {
                id : "11",
                docID :"2",
                username : "pacient2",
                password : "123456",
                type : "pacient",
                firstname : "Alexandru",
                lastname : "Mic",
                age : "56",
                gender : "masculin",
                ageCategory : "senior",
                analize : [{
                    data : "13.10.2015",
                    disease : "boala2",
                    detalii : "description text, haha"
                }]
            },
            {
                id : "13",
                docID :"2",
                username : "aaa",
                password : "1112212121",
                type : "pacient",
                firstname : "Name",
                lastname : "OtherName",
                age : "56",
                gender : "masculin",
                ageCategory : "senior",
                analize : [{
                    data : "13.10.2015",
                    disease : "boala2",
                    detalii : "description text, haha"
                }]
            }
        ];
        var currentUsers = {};
        $localStorage.currentUser = currentUsers;
        vm.currentUser =  $localStorage.currentUser;

        $localStorage.users = userData;
        vm.users = $localStorage.users;

        $localStorage.appointments = appointments;

        $localStorage.doctors = doctors;
        vm.doctors = $localStorage.doctors;


        vm.submit = function(){
            for ( var i= 0, len = vm.users.length; i < len; i++  ){
                if ( vm.username === vm.users[i].username ){
                    if ( vm.parola === '' + vm.users[i].password ){
                        if ( vm.users[i].type === 'pacient' ){
                            vm.currentUser={
                                id : vm.users[i].id
                            };
                            $localStorage.currentUser = vm.currentUser;
                            $state.go( 'pacient',({
                                id : vm.users[i].id
                            }) );
                        }

                    }
                }
            }
            for(var x = 0, l = vm.doctors.length; x < l; x++ ){
                if ( vm.username === vm.doctors[x].username ){
                    if ( vm.parola === '' + vm.doctors[x].password ){
                        vm.currentUser = {
                            docID : vm.doctors[x].docID
                        };
                        $localStorage.currentUser = vm.currentUser;
                        $state.go( 'medic', ({
                            id : vm.doctors[x].docID
                        }) );

                    }
                }
            }

        };
        //console.log(vm.submit());

        //--------- register new medic -----------------

        vm.capitalize = function( field ){
            vm.input[ field ] = $filter( 'capitalizeFirst' )( $scope.form[ field ].$viewValue );
        };

        vm.success = false;

        vm.addMedic = function () {
            var medic = vm.input;
            vm.newMedic = new Medic(medic);
            vm.newMedic.addMedic();
            vm.input = {};
            vm.success = true;

         };

    }



})( angular );