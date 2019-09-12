import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { CUSTOMER_MODAL } from '../src/constants';
import UserMiddleware from '../src/middlewares/customerMiddleware';
import { login } from './__helpers__';
import { mockModel } from './__mocks__/mock-modals';
import { customerModalMocks } from './__mocks__/mock-objects';

chai.should();

chai.use(chaiHttp);

describe('Middleware', () => {
	let token;

	before(async () => {
		mockModel(CUSTOMER_MODAL, customerModalMocks);
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
				res.body.should.have.property('error');
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
