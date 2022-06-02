const router = require('express').Router();

// destructure query methods from controllers
const { getAll, getTransaction } = require('../../controllers/transaction-controller');

router.route('/transactions/all').get(getAll)
router.route('/transactions').get(getTransaction)
 

module.exports = router;

