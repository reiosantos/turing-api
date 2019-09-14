import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { CUSTOMER_MODAL, ORDER_MODAL } from '../src/constants';
import { login } from './__helpers__';
import {
	clearMock,
	mockModel,
	mockModelFunction,
	mockSendMail,
	mockStripe
} from './__mocks__/mock-modals';
import { customerModalMocks, orderModalMocks, orderObject } from './__mocks__/mock-objects';

chai.should();

chai.use(chaiHttp);

describe('ShoppingCart', () => {
	let token;
	let chargeData = {
		stripeToken: "qwertyuiolkjhgfdsaxcvbnm",
		order_id: 1,
		amount: 99,
		description: "santos"
	};
	
	beforeEach( () => {
		clearMock();
		mockModel(CUSTOMER_MODAL, customerModalMocks);
		mockModel(ORDER_MODAL, orderModalMocks);
		mockStripe();
		mockSendMail();
	});
	
	beforeEach(async () => {
		token = await login();
	});
	
	afterEach(() => {
		clearMock();
	});

	describe('Process Stripe Payment', () => {
		it('should fail paying for non existent order', (done) => {
			mockStripe(Promise.reject({message: 'Invalid source'}));
			
			chai.request(server)
				.post('/api/stripe/charge')
				.set({ 'USER-KEY': token })
				.send(chargeData)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					expect(res.body.message).to.eql('Invalid source');
					done();
				});
		});
		
		it('should make payment for order', (done) => {
			mockModelFunction(ORDER_MODAL, 'findOne', {
				dataValues: orderObject,
			});
			
			chai.request(server)
				.post('/api/stripe/charge')
				.set({ 'USER-KEY': token })
				.send(chargeData)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('id');
					res.body.should.have.property('paid');
					expect(res.body.paid).to.eql(true);
					done();
				});
		});
	});
});
