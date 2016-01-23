var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  res.render('index', {
    title: 'Geckoboard - CenterCode',
    content: db
  });
});

module.exports = router;
