const json = require('../model/transactions.json');


const transactionController = {
	// Initial query to gather all transactions
	getAll(req, res) {
		res.send(json)
	},

	// Function to handle all query parameters
	getTransaction(req, res) {
		// Get query params object from req
		const queryObj = req.query
		console.log('queryObj: ', queryObj);
	
		let transactions = []

		let effectiveStartDate;
		let effectiveEndDate;
		
		// if queryObj is empty respond with 400 code
		if (JSON.stringify(queryObj) === '{}'){
			res.status(400).json({
				error: `At least one tag must be provided`
			})
		}

		// Get key and value from query parameters
	  for (const key in queryObj) {
			console.log('value: ', queryObj[key]);
			console.log('key', key)
			let value = queryObj[key];
		
			// Config and set start/end date from query params if given
			if (key.includes('EffectiveDate')) {
				if (key === 'EffectiveDateStart') {
					effectiveStartDate = new Date(value)
					continue;
				}
				if (key === 'EffectiveDateEnd') {
					effectiveEndDate = new Date(value)
					continue;
				}
			}
			
			// Filter transaction data for matching key and values
			const transaction = json.filter(data => String(data[key]) === String(value))[0]
			
			// Push filtered data to transactions array
			transactions.push(transaction)
		}
		// Filter transaction data within given dates
		let rangeResult = json.filter(data => {
			const date = new Date(data.EffectiveDate)
			return (date >= effectiveStartDate && date <= effectiveEndDate)
		})
		
		
		// Check/log ID's of all transactions
		const IDs = [...new Set(transactions.map(data => data.Id))]
		console.log('IDs: ', IDs);

		// Set new array to push filtered data into
		let result = []

		// Check for unique ID's then push filtered transaction data into result
		IDs.forEach(id => {
			result.push(transactions.filter(data => data.Id === id)[0])
		});

		// Return result and rangeResult
		res.json([...result, ...rangeResult])
	}
}

// Export transactionController methods
module.exports = transactionController