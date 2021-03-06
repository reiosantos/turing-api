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
	product_id: 1,
	name: "Thomas Moore",
	description: "One of the greatest if not the greatest of Irish poets and writers, Moore led a very interesting life, though plagued with tragedy in a somewhat typically Irish way. Remember \"The Last Rose of Summer\"?",
	price: "15.95",
	discounted_price: "14.99",
	image: "thomas-moore.gif",
	image_2: "thomas-moore-2.gif",
	thumbnail: "thomas-moore-thumbnail.gif",
	display: 2,
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

export const categoryObject = {
	dataValues: {
		category_id: 1,
		department_id: "1234",
		name: "LG, Red",
		description: "3456ytr"
	}
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
		dataValues: { count: 2, rows: [productObject, productObject] }
	},
	findByPkResult: null,
	updateResult: null,
	destroyResult: null
};

export const categoryModalMocks = {
	createResult: {
		dataValues: categoryObject,
	},
	findOneResult: {
		dataValues: categoryObject,
	},
	findAllResult: [categoryObject, categoryObject],
	findAndCountAllResult: {
		dataValues: { count: 2, rows: [categoryObject, categoryObject] }
	},
	findByPkResult: null,
	updateResult: null,
	destroyResult: null
};

export const productCategoryModalMocks = {
	createResult: null,
	findOneResult: {
		dataValues: productObject,
	},
	findAllResult: {
		dataValues: []
	},
	findAndCountAllResult: {
		dataValues: [productObject, productObject]
	},
	findByPkResult: null,
	updateResult: null,
	destroyResult: null
};
