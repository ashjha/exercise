angular.module('exerciseApp', [])
  .controller('StudentController', function($http) {
    var student = this;
    student.students=[];
    student.addNew = false;
    student.updateAddress = false;
    student.create = {};
    student.newAddress = {};
    student.allBtnDisable = false;
    student.studentIdForUpdate = null;
    
    
    student.toggleAddNewStudent = function(){
        student.addNew = !student.addNew;
        student.updateAddress = false;        
    }

    student.showUpdateAddress = function(id){        
        student.updateAddress = true;
        student.addNew = false;
        student.studentIdForUpdate = id;
        
    }

    student.hideUpdateAddress = function (id) {    
        student.updateAddress = false;
        student.addNew = false;
        student.studentIdForUpdate = null;
    }

    student.getStudents = function(){
        setStudents();
    }

    function setStudents(){
        $http({
            method: 'GET',
            url: '/api/student/all'
        }).then(function successCallback(res) {
            console.log(res.data.students)
            student.students=res.data.students;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

    student.AddNewStudent = function(){
        student.allBtnDisable = true;
        $http({
            method: 'POST',
            url: '/api/student/create',           
            data : student.create
        }).then(function successCallback(response) {
            student.allBtnDisable = false;
            student.addNew = false;
            student.create={};
            setStudents();                        
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            student.allBtnDisable = false;            
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    student.addNewAddress = function(){
        student.allBtnDisable = true;
        $http({
            method: 'PUT',
            url: '/api/student/add/address',           
            data : {
                id:student.studentIdForUpdate,
                address:student.newAddress
            }
        }).then(function successCallback(response) {
            student.allBtnDisable = false;
            student.updateAddress = false;
            student.newAddress={};
            setStudents();
            // console.log(response);                          
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            student.allBtnDisable = false;            
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        
    }

    student.getAddressOnly = function(address){
        var obj = address[address.length-1];
        if(!obj) return 'n/a';
        var add = Object.keys(obj).reduce(function (res, v) {
            return res.concat(obj[v]);
        }, []).join();
        return add;
    }
});