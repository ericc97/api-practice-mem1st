const file = './model/transactions.json';
const fs = require('fs');
const where = require('lodash.where')
const json = require('../model/transactions.json')

// Create function to read file and 
const readFile = (
	callback,
	returnJson = false,
	filePath = file,
	encoding = 'utf8'
) => {
	fs.readFile(filePath, encoding, (err, data) => {
		if (err) {
			throw err;
		}
		callback(returnJson ? JSON.parse(data) : data)
	})
};


const transactionController = {
	async getAll(req, res) {
		readFile(data => {
			res.send(data)
		}, true)
	},

	async getByID(req, res) {
		console.log('req: ', req);
		// Get id number from url
		const id = req.query.id
		readFile(data => {
			let result = where(data, { "Id": id })
			res.send(result)
			
		}, true)
	},

	getByAcct(req, res) {
		console.log('req: ', req);
		
		// Get account number from url
		const acct = req.query.acct
		console.log('acct: ', acct);

		readFile(data => {
			let result = where(data, { "AccountNumber": acct });
			res.send(result)
		}, true)
	},

	getTransaction(req, res) {
		const queryObj = req.query
		console.log('queryObj: ', queryObj);

		let transactions = []

		let effectiveStartDate;
		let effectiveEndDate;
		
	  for (const key in queryObj) {
			let value = queryObj[key];
			
			if (key.includes('EffectiveDate')) {
				if (key === 'EffectiveDateStart') {
					effectiveStartDate = new Date(value)
					continue
				}
				if (key === 'EffectiveDateEnd') {
					effectiveEndDate = new Date(value)
					continue
				}
			}
			
			const transaction = json.filter(data => String(data[key]) === String(value))[0]
			
			transactions.push(transaction)
		}

		let rangeResult = json.filter(data => {
			const date = new Date(data.EffectiveDate)
			return (date >= effectiveStartDate && date <= effectiveEndDate)
		})
		
		const IDs = [...new Set(transactions.map(data => data.Id))]
		console.log('IDs: ', IDs);

		let result = []

		IDs.forEach(id => {
			result.push(transactions.filter(data => data.Id === id)[0])
		});


		res.json([...result, ...rangeResult])
	}
}


module.exports = transactionController