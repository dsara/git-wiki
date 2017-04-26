var express = require('express');
var router = express.Router();

var Page = require("../model/gitwikipage");

// api for pages
router.get('/pages', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.json({ test: "yo" });
});

router.post('/pages/create', function(req, res, next) {
  Page.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;