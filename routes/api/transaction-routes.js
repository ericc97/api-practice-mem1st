const router = require('express').Router();

// destructure query methods from controllers
const { getAll, getByID, getByAcct, getTransaction } = require('../../controllers/transaction-controller');

// router.route('/transactions/account').get(getByAcct)
//router.route('/transactions').get(getByID)
router.route('/transactions').get(getTransaction)
//  router.route('/transactions').get(getAll)

module.exports = router;

