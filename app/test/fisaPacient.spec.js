/*global describe, it, beforeEach, expect, inject, module*/

describe('FisaPacient controller', function () {

    beforeEach(module('app'));

    var $controller,
        $scope,
        $localStorage,
        $stateParams,
        Patient,
        Medic,
        controller;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$localStorage_, _$stateParams_, _Patient_, _Medic_){
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $localStorage = _$localStorage_;
        $stateParams = _$stateParams_;
        Patient = _Patient_;
        Medic = _Medic_;

        $localStorage = {
            currentUser : [{id:"10"}],
            users : [{"id":"10","docID":"1","username":"user-pacient","password":"123456","type":"pacient","firstname":"Hulea","lastname":"Georgiana","age":"12","gender":"feminin","ageCategory":"child","analize":[{"data":"12.09.2015","disease":"boala1","detalii":"text, looooooooooong text"},{"data":"10.09.2015","disease":"boala1","detalii":"second row. hurray."}]},{"id":"9","docID":"2","username":"paciedasfa","password":"12344444456","type":"pacient","firstname":"Ana","lastname":"Anusca","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"11","docID":"2","username":"pacient2","password":"123456","type":"pacient","firstname":"Alexandru","lastname":"Mic","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"13","docID":"2","username":"aaa","password":"1112212121","type":"pacient","firstname":"Name","lastname":"OtherName","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"oukm","docID":"1","username":"fgasdgasdg","password":"ghdAAa!@#1!!23A","type":"pacient","firstname":"Hfghsd","lastname":"Fghfd","gender":"feminin","cnp":"5454545463545","age":"46","ageCategory":"adult","analize":[{"data":"2015-12-31T22:00:00.000Z","disease":"Dgsdfgsdfg","detalii":"Gdsgsdfgdfjgnalkdgadnk/lk"},{"data":"2015-12-31T22:00:00.000Z","disease":"dagdg","detalii":"sgasda"},{"data":"2015-11-29T22:00:00.000Z","disease":"ghdhd","detalii":"hdghd"},{"data":"2015-12-31T22:00:00.000Z","disease":"hgcgjcg","detalii":"jgvj"}]}],
            doctors : [{"docID":"1","firstname":"SomeName","lastname":"SomeOtherName","username":"doc","password":"123","specializare":"ORL"},{"docID":"2","firstname":"SecondName","lastname":"SomeOtherSecondName","username":"docTwo","password":"sdasAAAAA","specializare":"cardiologie"}],
            appointments : [{"appID":"54","id":"10","docID":"1","time":"10:00","date":"2016-12-30","firstname":"Hulea","lastname":"Georgiana"},{"appID":"4","id":"5","docID":"2","time":"10:00","date":"2016-12-30","firstname":"Text","lastname":"Georgiana"}]
        };

        $stateParams.id = '10';
        controller = $controller('FisaPacientController', { $scope: $scope, $localStorage : $localStorage, $stateParams : $stateParams, Medic: Medic });

    }));

    it('something should equal test', function() {
        expect(controller.something).toEqual('test');
    });

    it('showError should be false', function() {
        expect(controller.showError).toBeFalsy();
    });

    it('hideRequiredError() than showError should be false', function(){
        controller.hideRequiredError();

        expect(controller.showError).toBeFalsy();
    });

    it('showRequiredError() than showError should be true', function(){
        var field = 'disease';
        controller.consultatie[ field ] = true;
        controller.showRequiredError(field);

        expect(controller.showError).toBeFalsy();
    });

    it('hideRequiredError() than showError should be false', function(){
        expect(controller.showError).toBeFalsy();
    });


    it('add should add medical tests', function () {
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

        var addTests = {
            "data": "22.11.2011",
            "disease": "test ",
            "detalii": "haha, worked"
        };

        var newMedic = new Medic(input);
        newMedic.addMedic();
        newMedic.addPatient(inputPatient);
        $stateParams.id = newMedic.getPatients()[0].id;
        newMedic.addMedicalTest(addTests);

        expect( newMedic.getPatients()[0].analize[1]).toEqual(addTests);
    });

});
