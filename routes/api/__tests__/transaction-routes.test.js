// Import super test to run express server without having to actually run it
const request = require('supertest');
const app = require('../../../app');

// Test to ensure 200 response when given correct query params
describe('Transaction routes', () => {
	test('Should respond with status code 200 if at least one tag is supplied', async () => {
		const response = await request(app).get('/api/transactions?Id=1');
		expect(response.statusCode).toBe(200)
	});
// Test to ensure 400 response when no query parameters are givin
	test('Should respond with a status code 400 if a tag is not supplied', async () => {
		const response = await request(app).get('/api/transactions');
		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBe(`At least one tag must be provided`)
	})
});