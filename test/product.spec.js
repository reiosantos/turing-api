import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { CUSTOMER_MODAL, PRODUCT_MODAL } from '../src/constants';
import { login } from './__helpers__';
import { clearMock, mockModel } from './__mocks__/mock-modals';
import { customerModalMocks, productModalMocks } from './__mocks__/mock-objects';

chai.should();

chai.use(chaiHttp);

describe('Product', () => {
	let token;
	
	beforeEach( () => {
		clearMock();
		mockModel(CUSTOMER_MODAL, customerModalMocks);
		mockModel(PRODUCT_MODAL, productModalMocks);
	});
	
	beforeEach(async () => {
		token = await login();
	});
	
	afterEach(() => {
		clearMock();
	});

	describe('Get All Product Items', () => {
		it('should return a list of all two products', (done) => {
			chai.request(server)
				.get('/api/products?description_length=200&limit=21&page=2')
				.set({ 'USER-KEY': token })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('products');
					expect(res.body.products).to.have.length(2);
					done();
				});
		});
	});
});
