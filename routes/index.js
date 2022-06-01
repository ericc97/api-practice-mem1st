const router = require('express').Router();

// import API routes from /api/index.js
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.use((req, res) => {
	res.status(404).json({ message: 'Resource was not found'});
});

module.exports = router;