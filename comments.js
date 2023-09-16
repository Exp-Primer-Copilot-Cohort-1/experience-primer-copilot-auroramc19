// Create web server
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Load database
var db = require('../db');

// Get all comments
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM comments', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

// Get comment by id
router.get('/:id', function(req, res, next) {
  db.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

// Create new comment
router.post('/', urlencodedParser, function(req, res, next) {
  db.query('INSERT INTO comments SET ?', req.body, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Update comment by id
router.put('/:id', urlencodedParser, function(req, res, next) {
  db.query('UPDATE comments SET ? WHERE id = ?', [req.body, req.params.id], function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Delete comment by id
router.delete('/:id', function(req, res, next) {
  db.query('DELETE FROM comments WHERE id = ?', [req.params.id], function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
