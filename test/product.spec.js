import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import {
	CATEGORY_MODAL,
	CUSTOMER_MODAL,
	PRODUCT_CATEGORY_MODAL,
	PRODUCT_MODAL
} from '../src/constants';
import ProductController from '../src/controllers/product.controller';
import { login } from './__helpers__';
import { clearMock, mockClassMethod, mockModel, mockModelFunction } from './__mocks__/mock-modals';
import {
	categoryModalMocks,
	customerModalMocks,
	productCategoryModalMocks,
	productModalMocks, productObject
} from './__mocks__/mock-objects';

chai.should();

chai.use(chaiHttp);

describe('Product', () => {
	let token;
	
	beforeEach( () => {
		clearMock();
		mockModel(CUSTOMER_MODAL, customerModalMocks);
		mockModel(PRODUCT_MODAL, productModalMocks);
		mockModel(PRODUCT_CATEGORY_MODAL, productCategoryModalMocks);
		mockModel(CATEGORY_MODAL, categoryModalMocks);
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
					res.body.should.have.property('count');
					expect(res.body.count).to.eq(2);
					done();
				});
		});
		
		it('should return a list of products based on category', (done) => {
			mockClassMethod(ProductController, 'getProductsForCategory', [
				productObject, productObject,
			]);
			chai.request(server)
				.get('/api/products/inCategory/3')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('count');
					expect(res.body.count).to.eql(2);
					done();
				});
		});
		
		it('should return a list of products based on Department', (done) => {
			mockClassMethod(ProductController, 'getProductsForCategory', [productObject,]);
			chai.request(server)
				.get('/api/products/inDepartment/5')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('count');
					expect(res.body.count).to.eql(2);
					done();
				});
		});
		
		it('should return a single product', (done) => {
			mockModelFunction(PRODUCT_MODAL, 'findOne', productObject);
			chai.request(server)
				.get('/api/products/1')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('product_id');
					done();
				});
		});
	});
});
