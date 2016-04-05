/*global describe, it, beforeEach, expect, inject, module*/

describe('Medic controller', function () {

    beforeEach(module('app'));

    var $controller,
        $filter,
        $scope,
        $localStorage,
        $stateParams,
        Medic,
        Patient,
        controller;

    beforeEach(inject(function(_$controller_, _$rootScope_,_$filter_, _$localStorage_, _$stateParams_, _Medic_,_Patient_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $filter = _$filter_;
        $localStorage = _$localStorage_;
        $stateParams = _$stateParams_;
        Medic = _Medic_;
        Patient = _Patient_;


        $localStorage = {
            users : [{"id":"10","docID":"1","username":"user-pacient","password":"123456","type":"pacient","firstname":"Hulea","lastname":"Georgiana","age":"12","gender":"feminin","ageCategory":"child","analize":[{"data":"12.09.2015","disease":"boala1","detalii":"text, looooooooooong text"},{"data":"10.09.2015","disease":"boala1","detalii":"second row. hurray."}]},{"id":"9","docID":"2","username":"paciedasfa","password":"12344444456","type":"pacient","firstname":"Ana","lastname":"Anusca","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"11","docID":"2","username":"pacient2","password":"123456","type":"pacient","firstname":"Alexandru","lastname":"Mic","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"13","docID":"2","username":"aaa","password":"1112212121","type":"pacient","firstname":"Name","lastname":"OtherName","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"oukm","docID":"1","username":"fgasdgasdg","password":"ghdAAa!@#1!!23A","type":"pacient","firstname":"Hfghsd","lastname":"Fghfd","gender":"feminin","cnp":"5454545463545","age":"46","ageCategory":"adult","analize":[{"data":"2015-12-31T22:00:00.000Z","disease":"Dgsdfgsdfg","detalii":"Gdsgsdfgdfjgnalkdgadnk/lk"},{"data":"2015-12-31T22:00:00.000Z","disease":"dagdg","detalii":"sgasda"},{"data":"2015-11-29T22:00:00.000Z","disease":"ghdhd","detalii":"hdghd"},{"data":"2015-12-31T22:00:00.000Z","disease":"hgcgjcg","detalii":"jgvj"}]}],
            doctors : [{"docID":"1","firstname":"SomeName","lastname":"SomeOtherName","username":"doc","password":"123","specializare":"ORL"},{"docID":"2","firstname":"SecondName","lastname":"SomeOtherSecondName","username":"docTwo","password":"sdasAAAAA","specializare":"cardiologie"}],
            appointments : [{"appID":"54","id":"10","docID":"1","time":"10:00","date":"2016-12-30","firstname":"Hulea","lastname":"Georgiana"},{"appID":"4","id":"5","docID":"2","time":"10:00","date":"2016-12-30","firstname":"Text","lastname":"Georgiana"}]
        };
        $stateParams.id = '1';

        controller = $controller('MedicController', { $filter : $filter, $scope: $scope, $localStorage : $localStorage, $stateParams : $stateParams });

    }));

    it('Patients should be an array', function () {
        expect(controller.pacients).toEqual(jasmine.any(Array));
    });

    it('localPatients should be an Array', function () {
        expect(controller.localPacients).toEqual(jasmine.any(Array));
    });

    it('patientOperations should be an instance of Medic', function () {
        expect(controller.patientOperations instanceof Medic).toBeTruthy();
    });

    it('showError should be false', function() {
        expect(controller.showError).toBeFalsy();
    });

    it('localPacients should be an Array', function() {
        expect(controller.localPacients).toEqual(jasmine.any(Array));
    });

    it('localPacientTests should be an Array', function() {
        expect(controller.localPacientTests).toEqual(jasmine.any(Array));
    });

    it('currentDoctor should be an Object', function() {
        expect(controller.currentDoctor).toEqual(jasmine.any(Object));
    });

    it('deletePatient should not contain deleteID', function() {
        var input = {
            "username": "fasdfsf",
            "password": "fsdaAA!11",
            "firstname": "Test",
            "lastname": "Pacient",
            "gender": "masculin",
            "cnp": "3142342354345",
            "age": "24",
            "specialties": "sdffasdf"
        };

        var inputPatient = {
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
        var medic = new Medic(input);
        var deleteId = "10";
        medic.deletePatient(deleteId);
        var newPatient = new Patient(inputPatient,inputAnalize);

        expect(newPatient.getAppointments()).not.toContain(deleteId);
    });

    it('addPatient should should add data', function(){
        var input = {
            "username": "fasdfsf",
            "password": "fsdaAA!11",
            "firstname": "Test",
            "lastname": "Pacient",
            "gender": "masculin",
            "cnp": "3142342354345",
            "age": "24",
            "specialties": "sdffasdf"
        };

        var inputPatient = {
            "username": "fasdfsf",
            "password": "fsdaAA!11",
            "firstname": "Test",
            "lastname": "Pacient",
            "gender": "masculin",
            "cnp": "3142342354345",
            "age": "24",
            "type": "pacient",
            "ageCategory": "senior",
            "data": "13.10.2015",
            "disease": "boala2",
            "detalii": "description text, haha"
        };

        var inputAnalize = {
            "data": "13.10.2015",
            "disease": "boala2",
            "detalii": "description text, haha"
        };

        var medicObj = new Medic(input);
        medicObj.addPatient(inputPatient);
        var newPatient = new Patient(inputPatient, inputAnalize);

        expect(newPatient.getPatient().pop().analize).toContain(jasmine.objectContaining(inputAnalize));
    });

   it('addPatient should remove one Object from users', function () {
        var input = {
            "username": "fasdfsf",
            "password": "fsdaAA!11",
            "firstname": "Test",
            "lastname": "Pacient",
            "gender": "masculin",
            "cnp": "3142342354345",
            "age": "24",
            "specialties": "sdffasdf"
        };

        var inputPatient = {
            "username": "fasdfsf",
            "password": "fsdaAA!11",
            "firstname": "Test",
            "lastname": "Pacient",
            "gender": "masculin",
            "cnp": "3142342354345",
            "age": "24",
            "type": "pacient",
            "ageCategory": "senior",
            "data": "13.10.2015",
            "disease": "boala2",
            "detalii": "description text, haha"
        };

       var inputAnalize = {
           "data": "13.10.2015",
           "disease": "boala2",
           "detalii": "description text, haha"
       };

       var medicObj = new Medic(input);
       medicObj.addPatient(inputPatient);
       var newPatient = new Patient(inputPatient, inputAnalize);

       expect(newPatient.getPatient().pop()).toEqual(jasmine.objectContaining({
           "username": "fasdfsf",
           "password": "fsdaAA!11",
           "firstname": "Test",
           "lastname": "Pacient",
           "gender": "masculin",
           "cnp": "3142342354345",
           "age": "24",
           "type": "pacient",
           "ageCategory": "senior"}));
   });

    it('deleteAppointment (controller function) should not contain id', function(){
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

        var deleteId = "54";
        controller.patientObj = new Patient(inputPatient, inputAnalize);
        controller.deleteAppointment(deleteId);

        expect(controller.patientObj.getAppointments()).not.toContain(deleteId);
    });

    it('deleteAppointments (method from class) should not contain the removed objects id', function () {

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

        expect(newPatient.getAppointments()).not.toContain(deleteId);
    });

    it('pageCount should be greater than 2', function(){
        controller.itemsPerPage = 1;

        expect(controller.pageCount()).toBeGreaterThan(1);
    });

    it('capitalize should capitalize first letter', function () {

        var input = 'hello';
        var result = $filter('capitalizeFirst')(input, 'capitalizeFirst');

        expect(result).toEqual('Hello');
    });

    it('hideRequiredError() than showError should be false', function(){
        controller.hideRequiredError();

        expect(controller.showError).toBeFalsy();
    });

    it('passedAppointments  ', function(){
        var appointmentTime = new Date(2013, 9, 23);
        controller.passedAppointments(appointmentTime);

        expect(controller.style).toEqual("{'text-decoration':'line-through'}");
    });
    it('order  ', function(){
        var predicate = 'firstname';
        controller.order(predicate);

        expect(controller.reverse).toBeTruthy();
    });


});

