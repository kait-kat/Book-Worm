const router = require('express').Router();
const path = require('path');
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

module.exports = router;