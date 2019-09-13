import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import server from '../src';
import { CUSTOMER_MODAL } from '../src/constants';
import { clearMock, mockModel, mockModelFunction } from './__mocks__/mock-modals';
import { customerModalMocks, customerObject } from './__mocks__/mock-objects';

chai.should();

chai.use(chaiHttp);

describe('Authentication', () => {
	beforeEach( () => {
		mockModel(CUSTOMER_MODAL, customerModalMocks);
	});
	
	afterEach(() => {
		clearMock();
	});

	describe('Create Customer', () => {
		it('should create new customer account', (done) => {
			mockModelFunction(CUSTOMER_MODAL, 'findOne', null);
			
			chai.request(server)
				.post('/api/customers')
				.send({
					password: 'santos',
					email: 'email2@turing.com',
					name: 'Moses'
				})
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('customer');
					res.body.customer.should.have.property('customer_id');
					done();
				});
		});
	});

	describe('Login', () => {
		it('No credentials provided', (done) => {
			chai.request(server)
				.post('/api/customers/login')
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					expect(res.body.code).to.eql('USR_03');
					done();
				});
		});

		it('Password is required', (done) => {
			chai.request(server)
				.post('/api/customers/login')
				.send({ email: 'email@turing.com' })
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					expect(res.body.code).to.eql('USR_11');
					done();
				});
		});

		it('Invalid credentials', (done) => {
			mockModelFunction(CUSTOMER_MODAL, 'findOne', {
				dataValues: customerObject,
				validatePassword: sinon.fake.returns(Promise.resolve(false)),
				getSafeDataValues: sinon.fake.returns(customerObject)
			});
			chai.request(server)
				.post('/api/customers/login')
				.send({
					email: 'some@wrong.email',
					password: 'santos'
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					expect(res.body.code).to.eql('USR_01');
					done();
				});
		});

		it('Successful login credentials', async () => {
			const user = await chai.request(server)
				.post('/api/customers/login')
				.send({
					email: 'email@turing.com',
					password: 'santos'
				});
			
			user.should.have.status(200);
			user.body.should.be.a('object');
			user.body.should.have.property('customer');
			user.body.customer.should.have.property('customer_id');
			user.body.should.have.property('access_token');
		});
	});
});
