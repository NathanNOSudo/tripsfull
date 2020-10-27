var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', login: 'please login or register to start tracking'});
});

module.exports = router;
