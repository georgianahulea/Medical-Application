/*global describe, it, beforeEach, expect, inject, module*/

describe('Pacient controller', function () {

    beforeEach(module('app'));

    var $controller,
        $scope,
        $localStorage,
        $stateParams,
        Patient,
        controller;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$localStorage_, _$stateParams_, _Patient_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $localStorage = _$localStorage_;
        $stateParams = _$stateParams_;
        Patient = _Patient_;


        $localStorage = {
            currentUser : [{id:"10"}],
            users : [{"id":"10","docID":"1","username":"user-pacient","password":"123456","type":"pacient","firstname":"Hulea","lastname":"Georgiana","age":"12","gender":"feminin","ageCategory":"child","analize":[{"data":"12.09.2015","disease":"boala1","detalii":"text, looooooooooong text"},{"data":"10.09.2015","disease":"boala1","detalii":"second row. hurray."}]},{"id":"9","docID":"2","username":"paciedasfa","password":"12344444456","type":"pacient","firstname":"Ana","lastname":"Anusca","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"11","docID":"2","username":"pacient2","password":"123456","type":"pacient","firstname":"Alexandru","lastname":"Mic","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"13","docID":"2","username":"aaa","password":"1112212121","type":"pacient","firstname":"Name","lastname":"OtherName","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"oukm","docID":"1","username":"fgasdgasdg","password":"ghdAAa!@#1!!23A","type":"pacient","firstname":"Hfghsd","lastname":"Fghfd","gender":"feminin","cnp":"5454545463545","age":"46","ageCategory":"adult","analize":[{"data":"2015-12-31T22:00:00.000Z","disease":"Dgsdfgsdfg","detalii":"Gdsgsdfgdfjgnalkdgadnk/lk"},{"data":"2015-12-31T22:00:00.000Z","disease":"dagdg","detalii":"sgasda"},{"data":"2015-11-29T22:00:00.000Z","disease":"ghdhd","detalii":"hdghd"},{"data":"2015-12-31T22:00:00.000Z","disease":"hgcgjcg","detalii":"jgvj"}]}],
            doctors : [{"docID":"1","firstname":"SomeName","lastname":"SomeOtherName","username":"doc","password":"123","specializare":"ORL"},{"docID":"2","firstname":"SecondName","lastname":"SomeOtherSecondName","username":"docTwo","password":"sdasAAAAA","specializare":"cardiologie"}],
            appointments : [{"appID":"54","id":"10","docID":"1","time":"10:00","date":"2016-12-30","firstname":"Hulea","lastname":"Georgiana"},{"appID":"4","id":"5","docID":"2","time":"10:00","date":"2016-12-30","firstname":"Text","lastname":"Georgiana"}]
        };
        $stateParams.id = '10';

        controller = $controller('PacientController', { $scope: $scope, $localStorage : $localStorage, $stateParams : $stateParams });

    }));

    it('localPatients should be an Array', function () {
        expect(controller.localPacients).toEqual(jasmine.any(Object));
    });

    it('localPatients should be an Array', function () {
        expect(controller.localPacientTests).toEqual(jasmine.any(Array));
    });

    it('today should be an new Date()', function () {
        controller.today();
        expect(controller.appDate).toEqual(new Date());
    });

    it('open should be true', function () {
        controller.open();
        expect(controller.popup.opened).toBeTruthy();
    });

    it('setDate should be true', function () {
        controller.setDate();
        expect(controller.appDate).toEqual(new Date());
    });

    it('patientOperations should be an instance of Medic', function () {
        expect(controller.newPatient instanceof Patient).toBeTruthy();
    });

    it('addAppointment should contain added appointment', function(){
        var inputPatient = {
            "id": "test",
            "username": "fasdfsf",
            "password": "fsdaAA!11",
            "firstname": "Test",
            "lastname": "Pacient",
            "gender": "masculin",
            "cnp": "3142342354345",
            "age": "24",
            "type": "pacient",
            "ageCategory": "senior"
        };

        var inputAnalize = {
            "data": "13.10.2015",
            "disease": "boala2",
            "detalii": "description text, haha"
        };

        var appDate = "1310.2015";
        var newPatient = new Patient(inputPatient, inputAnalize);
        newPatient.addAppointment(appDate);

        expect(newPatient.getAppointments().pop().date).toContain(appDate);
    });

    it('deleteAppointment should not contain the removed objects id', function () {

        var inputPatient = {
            "id": "test",
            "username": "fasdfsf",
            "password": "fsdaAA!11",
            "firstname": "Test",
            "lastname": "Pacient",
            "gender": "masculin",
            "cnp": "3142342354345",
            "age": "24",
            "type": "pacient",
            "ageCategory": "senior"
        };

        var inputAnalize = {
            "data": "13.10.2015",
            "disease": "boala2",
            "detalii": "description text, haha"
        };

        var newPatient = new Patient(inputPatient, inputAnalize);
        var deleteId = "54";
        newPatient.deleteAppointments(deleteId);

        expect(newPatient.getAppointments()).not.toContain(deleteId);
    });

    it('appointments should be an Array', function () {
        expect(controller.appointments).toEqual(jasmine.any(Array));
    });


});