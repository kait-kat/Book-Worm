const router = require('express').Router();
const path = require('path');
const apiRoutes = require('../../client/src/utils/API.js');

router.use('/api', apiRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/public/index.html'));
});

module.exports = router;