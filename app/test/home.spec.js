/*global describe, it, beforeEach, expect, inject, module*/

describe('Home Controller', function(){
    beforeEach(module('app'));

    var $controller,
        $scope,
        $localStorage,
        $stateParams,
        Medic,
        controller;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$localStorage_, _$stateParams_, _Medic_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $localStorage = _$localStorage_;
        $stateParams = _$stateParams_;
        Medic = _Medic_;


        $localStorage = {
            users : [{"id":"10","docID":"1","username":"user-pacient","password":"123456","type":"pacient","firstname":"Hulea","lastname":"Georgiana","age":"12","gender":"feminin","ageCategory":"child","analize":[{"data":"12.09.2015","disease":"boala1","detalii":"text, looooooooooong text"},{"data":"10.09.2015","disease":"boala1","detalii":"second row. hurray."}]},{"id":"9","docID":"2","username":"paciedasfa","password":"12344444456","type":"pacient","firstname":"Ana","lastname":"Anusca","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"11","docID":"2","username":"pacient2","password":"123456","type":"pacient","firstname":"Alexandru","lastname":"Mic","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"13","docID":"2","username":"aaa","password":"1112212121","type":"pacient","firstname":"Name","lastname":"OtherName","age":"56","gender":"masculin","ageCategory":"senior","analize":[{"data":"13.10.2015","disease":"boala2","detalii":"description text, haha"}]},{"id":"oukm","docID":"1","username":"fgasdgasdg","password":"ghdAAa!@#1!!23A","type":"pacient","firstname":"Hfghsd","lastname":"Fghfd","gender":"feminin","cnp":"5454545463545","age":"46","ageCategory":"adult","analize":[{"data":"2015-12-31T22:00:00.000Z","disease":"Dgsdfgsdfg","detalii":"Gdsgsdfgdfjgnalkdgadnk/lk"},{"data":"2015-12-31T22:00:00.000Z","disease":"dagdg","detalii":"sgasda"},{"data":"2015-11-29T22:00:00.000Z","disease":"ghdhd","detalii":"hdghd"},{"data":"2015-12-31T22:00:00.000Z","disease":"hgcgjcg","detalii":"jgvj"}]}],
            doctors : [{
                "docID": "1",
                "firstname": "SomeName",
                "lastname": "SomeOtherName",
                "username": "doc",
                "password": "123",
                "specializare": "ORL"
            }, {
                "docID": "2",
                "firstname": "SecondName",
                "lastname": "SomeOtherSecondName",
                "username": "docTwo",
                "password": "sdasAAAAA",
                "specializare": "cardiologie"
            }, {
                "docID": "7w2h",
                "username": "fasdfsf",
                "password": "fsdaAA!11",
                "firstname": "Test",
                "lastname": "Pacient",
                "gender": "masculin",
                "cnp": "3142342354345",
                "age": "24",
                "specialties": "sdffasdf"
            }],
            appointments : [{"appID":"54","id":"10","docID":"1","time":"10:00","date":"2016-12-30","firstname":"Hulea","lastname":"Georgiana"},{"appID":"4","id":"5","docID":"2","time":"10:00","date":"2016-12-30","firstname":"Text","lastname":"Georgiana"}]
        };
        $stateParams.id = '1';

        controller = $controller('HomeController', { $scope: $scope, $localStorage : $localStorage, $stateParams : $stateParams });

    }));


    it('Login as pacient (submit)  should equal pacient id', function () {

        controller.username = "pacient2";
        controller.parola = "123456";

        controller.submit();
        expect(controller.currentUser).toEqual({"id":"11"});

    });

    it('Login as pacient (submit)  should not equal pacient id', function () {

        controller.username = "notWorking";
        controller.parola = "12eidd";

        controller.submit();
        expect(controller.currentUser).not.toEqual({"id":"11"});

    });

    it('Login as pacient (submit)  should equal pacient id', function () {

         var controller = $controller('HomeController', { $scope: $scope, $localStorage : $localStorage, $stateParams : $stateParams });

         controller.username = "doc";
         controller.parola = "123";

         controller.submit();
         expect(controller.currentUser).toEqual({"docID":"1"});

    });
    it('addMedic should return localStorage with new data', function () {

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

        var newMedic = new Medic(input);

        newMedic.addMedic();

        expect(newMedic.getMedics().pop()).toEqual(newMedic);
    });
});