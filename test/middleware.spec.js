import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import UserMiddleware from '../app/middlewares/customerMiddleware';
import { login } from './__helpers__';

chai.should();

chai.use(chaiHttp);

describe('Middleware', () => {
	let token;

	before(async () => {
		token = await login();
	});

	it('should return empty array', () => {
		const ret = UserMiddleware.validate();
		expect(ret).to.be.a('Array');
		expect(ret).to.eql([]);
	});

	it('should return unknown URL 404', (done) => {
		chai.request(server)
			.post('/api/unknown')
			.set('USER-KEY', `Bearer ${token}`)
			.end((err, res) => {
				res.should.have.status(404);
				res.body.should.have.property('code');
				expect(res.body.code).to.eql('APP_01');
				done();
			});
	});

	// it('should return 401', (done) => {
	// TODO: this will be uncommenteed out when an endpoint that requires a USER-KEY header is
	//  written
	// 	chai.request(server)
	// 		.post('/api/customer/users')
	// 		.end((err, res) => {
	// 			res.should.have.status(401);
	// 			res.body.should.have.property('message');
	// 			expect(res.body.message).to.eql('No authorization token was found');
	// 			done();
	// 		});
	// });
});
