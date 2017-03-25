var mongoose = require('mongoose')
  , Student = require('../model/student')


/**********************************************************************
 *                    Get all Role
 *********************************************************************/

exports.getStudents = function(req, res) {

    Student.find({},function(err,students) {
        if (err)
          res.status(400).json({error:err,message: 'Somthing went wrong please try again later'});
        
        else 
         res.status(200).json({students:students});         
    });
};


/**********************************************************************
 *                    addRole
 *********************************************************************/

exports.createStudent = function(req, res) {

    var newStudent = new Student(req.body);

    newStudent.save(function(err) {
        console.log(err)
        if (err)
          res.status(400).json({error:err,message: 'Somthing went wrong please try again later'});
        
        else 
         res.status(200).json({message: 'New Student Added'}); 
        
    });
};

exports.addNewAddress = function (req,res){
    Student.findByIdAndUpdate(req.body.id,
        {$push: {"address": req.body.address.address}},
        {safe: true, upsert: true},
        function(err, model) {
        if (err)
          res.status(400).json({error:err,message: 'Somthing went wrong please try again later'});
        
        else 
         res.status(200).json({message: 'Address Updated'}); 
        }
    );
}

/**********************************************************************
 *                              End                                   * 
 *********************************************************************/