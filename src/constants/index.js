export const CUSTOMER_MODAL = 'customer';
export const ORDER_MODAL = 'order';
export const PRODUCT_MODAL = 'product';
export const SHOPPING_CART_MODAL = 'shopping_cart';

export const TTL = 60 * 60;

export const errorMessages = {
	AUT_01: 'Authorization code is empty.',
	AUT_02: 'Access Unauthorized.',
	USR_01: 'Email or Password is invalid.',
	USR_02: 'The field(s) are/is required.',
	USR_03: 'The email is invalid.',
	USR_04: 'The email already exists.',
	USR_05: 'The email doesn\'t exist.',
	USR_06: 'This is an invalid phone number.',
	USR_07: 'This is too long <FIELD NAME>.',
	USR_08: 'This is an invalid Credit Card.',
	USR_09: 'The Shipping Region ID is not number',
	USR_10: 'The username is invalid.',
	USR_11: 'The password is empty.',
	CAT_01: 'Don\'t exist category with this ID.',
	DEP_01: 'The ID is not a number.',
	DEP_02: 'Don\'exist department with this ID.',
	ORD_01: 'Don\'exist order with this ID.',
	PAG_01: 'The order is not matched \'field,(DESC|ASC)\'.',
	PAG_02: 'The field of order does not allow sorting.',
	APP_01: 'Resource does not exist.',
	PDT_01: 'This value is not a valid number.',
	PAY_01: 'Payment Failed',
	PAY_02: 'This Field is empty/invalid',
	PAY_03: 'No Data Found',
};

export const errors = {
	urlNotFound: {
		field: 'url',
		message: errorMessages.APP_01,
		code: 'APP_01'
	},
	unauthorized: {
		field: 'USER-KEY',
		message: errorMessages.AUT_02,
		code: 'AUT_02'
	},
	invalidCredentials: {
		field: 'auth',
		message: errorMessages.USR_01,
		code: 'USR_01',
		status: 401
	},
	getError: function (code, field = '', status = 400, message) {
		return {
			field,
			message: message || errorMessages[code],
			code: code,
			status
		};
	}
};
