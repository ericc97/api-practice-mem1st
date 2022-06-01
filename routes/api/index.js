const router = require('express').Router();
const transactionRoutes = require('./transaction-routes')


router.use('/', transactionRoutes);

module.exports = router;