import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { CUSTOMER_MODAL, ORDER_MODAL, SHOPPING_CART_MODAL } from '../src/constants';
import { login } from './__helpers__';
import {
	clearMock,
	mockModel,
	mockModelFunction,
	mockSendMail,
	mockStripe
} from './__mocks__/mock-modals';
import {
	cartModalMocks,
	customerModalMocks,
	orderModalMocks,
	orderObject
} from './__mocks__/mock-objects';

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
		mockModel(SHOPPING_CART_MODAL, cartModalMocks);
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
	
	describe('Add Items to cart', () => {
		it('should generate unique cart ID', (done) => {
			chai.request(server)
				.get('/api/shoppingcart/generateUniqueId')
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('cart_id');
					done();
				});
		});
		
		it('should fail due to missing data', (done) => {
			chai.request(server)
				.post('/api/shoppingcart/add')
				.send({
					cart_id: "1234",
					product_id: 3,
					quantity: 7
				})
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('field');
					expect(res.body.field).to.eql("validation");
					done();
				});
		});
		
		it('should add Items to cart', (done) => {
			mockModelFunction(SHOPPING_CART_MODAL, 'findAll', {dataValues: [{
					cart_id: "1234",
					product_id: 3,
					attributes: "LG, Red",
					quantity: 7
				}]});
			chai.request(server)
				.post('/api/shoppingcart/add')
				.send({
					cart_id: "1234",
					product_id: 3,
					attributes: "LG, Red",
					quantity: 7
				})
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('array');
					res.body[0].should.have.property('cart_id');
					expect(res.body[0].cart_id).to.eql("1234");
					done();
				});
		});
		
		it('should Return all Items in a cart', (done) => {
			mockModelFunction(SHOPPING_CART_MODAL, 'findAll', {dataValues: [{
					cart_id: "1234",
					product_id: 3,
					attributes: "LG, Red",
					quantity: 7
				}, {
					cart_id: "14",
					product_id: 3,
					attributes: "LG, Red",
					quantity: 7
				}]});
			chai.request(server)
				.get('/api/shoppingcart/1234')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.should.have.length(2);
					expect(res.body[0].cart_id).to.eql("1234");
					expect(res.body[1].cart_id).to.eql("14");
					done();
				});
		});
	})
});
