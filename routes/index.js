var express = require('express');
var router = express.Router();
var studentController = require('../controller/student');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/student/all', studentController.getStudents);
router.post('/api/student/create', studentController.createStudent);
router.put('/api/student/add/address', studentController.addNewAddress);

module.exports = router;
