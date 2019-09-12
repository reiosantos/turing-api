import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import { deleteAllModals } from './__helpers__';

chai.should();

chai.use(chaiHttp);

describe('Authentication', () => {
	beforeEach(async () => {
		await deleteAllModals();
	});

	afterEach(async () => {
		await deleteAllModals();
	});

	describe('Create Customer', () => {
		it('should create new customer account', (done) => {
			chai.request(server)
				.post('/api/customer')
				.send({
					password: 'santos',
					email: 'email@turing.com',
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
				.post('/api/customer/login')
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
				.post('/api/customer/login')
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
			chai.request(server)
				.post('/api/customer/login')
				.send({
					email: 'some@wrong.email',
					password: 'santos'
				})
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(401);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					expect(res.body.code).to.eql('USR_01');
					done();
				});
		});

		it('Successful login credentials', async () => {
			const user = await chai.request(server)
				.post('/api/customer')
				.send({
					password: 'santos',
					email: 'email@turing.com',
					name: "santos1"
				});
			user.should.have.status(201);
			user.body.should.be.a('object');
			user.body.should.have.property('customer');
			user.body.customer.should.have.property('customer_id');
			user.body.should.have.property('access_token');

			const loggedInUser = await chai.request(server)
				.post('/api/customer/login')
				.send({
					email: 'email@turing.com',
					password: 'santos'
				});

			loggedInUser.should.have.status(200);
			loggedInUser.body.should.be.a('object');
			user.body.should.have.property('customer');
			user.body.customer.should.have.property('customer_id');
			user.body.should.have.property('access_token');
		});
	});
});
