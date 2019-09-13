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
	order_id: 1,
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
