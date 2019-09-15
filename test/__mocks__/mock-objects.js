import sinon from 'sinon';

export const customerObject = {
	customer_id: 1,
	name: "santos",
	email: "santos@turing.com",
	password: "sotnas",
	credit_card: null,
	address_1: null,
	address_2: null,
	city: null,
	region: null,
	postal_code: null,
	country: null,
	shipping_region_id: 1,
	day_phone: null,
	eve_phone: null,
	mob_phone: null,
	Orders: []
};

export const orderObject = {
	product_id: 2,
	name: "Chartres Cathedral",
	description: "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
	price: "16.95",
	discounted_price: "15.95",
	thumbnail: "chartres-cathedral-thumbnail.gif"
};

export const productObject = {
	order_id: 1,
	product_id: 1,
	attributes: "LG, Red",
	product_name: "Arc d'Triomphe",
	quantity: 1,
	unit_cost: "14.99",
	subtotal: "14.99"
};

export const cartObject = {
	item_id: 1,
	cart_id: "1234",
	product_id: 2333,
	attributes: "LG, Red",
	quantity: 76,
	buy_now: true,
	added_on: "2019-09-15T13:23:10.000Z",
	Product: null
};

export const customerModalMocks = {
	createResult: {
		dataValues: customerObject,
		validatePassword: sinon.fake.returns(Promise.resolve()),
		getSafeDataValues: sinon.fake.returns(customerObject)
	},
	findOneResult: {
		dataValues: customerObject,
		validatePassword: sinon.fake.returns(Promise.resolve(true)),
		getSafeDataValues: sinon.fake.returns(customerObject)
	},
	findAllResult: [],
	findByPkResult: null,
	updateResult: null,
	destroyResult: null
};

export const orderModalMocks = {
	createResult: {
		dataValues: orderObject,
	},
	findOneResult: {
		dataValues: orderObject,
	},
	findAllResult: [],
	findByPkResult: null,
	updateResult: null,
	destroyResult: null
};

export const cartModalMocks = {
	createResult: {
		dataValues: cartObject,
	},
	findOneResult: {
		dataValues: cartObject,
	},
	findAllResult: [],
	findByPkResult: null,
	updateResult: null,
	destroyResult: null
};

export const productModalMocks = {
	createResult: {
		dataValues: productObject,
	},
	findOneResult: {
		dataValues: productObject,
	},
	findAllResult: {
		dataValues: [productObject, productObject]
	},
	findAndCountAllResult: {
		dataValues: [productObject, productObject]
	},
	findByPkResult: null,
	updateResult: null,
	destroyResult: null
};
