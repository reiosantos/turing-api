/**
 * Check each method in the shopping cart controller and add code to implement
 * the functionality or fix any bug.
 * The static methods and their function include:
 *
 * - generateUniqueCart - To generate a unique cart id
 * - addItemToCart - To add new product to the cart
 * - getCart - method to get list of items in a cart
 * - updateCartItem - Update the quantity of a product in the shopping cart
 * - emptyCart - should be able to clear shopping cart
 * - removeItemFromCart - should delete a product from the shopping cart
 * - createOrder - Create an order
 * - getCustomerOrders - get all orders of a customer
 * - getOrderSummary - get the details of an order
 * - processStripePayment - process stripe payment
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */


import moment from 'moment';
import { errors, ORDER_MODAL, SHOPPING_CART_MODAL } from '../constants';
import MailHelper from '../helpers/email';
import StripeHelper  from '../helpers/stripe';
import DatabaseWrapper from '../models';

/**
 *
 *
 * @class shoppingCartController
 */
class ShoppingCartController {
	/**
	 * generate random unique id for cart identifier
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with cart_id
	 * @memberof shoppingCartController
	 */
	static generateUniqueCart(req, res) {
		let int = `${Math.random() * (10 ** (10 - 1)) << 0}`;
		return res.status(200).json({ cart_id: int });
	}
	
	/**
	 * adds item to a cart with cart_id
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with cart
	 * @memberof ShoppingCartController
	 */
	static async addItemToCart(req, res) {
		try {
			const { body, customer_id } = req;
			const { cart_id, product_id, attributes, quantity } = body;
			
			await DatabaseWrapper.createOne(SHOPPING_CART_MODAL, {
				cart_id, product_id, attributes, customer_id, quantity
			});
			const data = await DatabaseWrapper.findAll(SHOPPING_CART_MODAL, { cart_id });
			return res.status(201).json(data);
		} catch (err) {
			return res.status(400).json(
				errors.getError('APP_01', 'order', 400, err.message));
		}
	}
	
	/**
	 * get shopping cart using the cart_id
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with cart
	 * @memberof ShoppingCartController
	 */
	static async getCart(req, res, next) {
		// implement method to get cart items
		try {
			const { params } = req;
			const { cart_id } = params;
			
			const cart = await DatabaseWrapper.findAll(SHOPPING_CART_MODAL, { cart_id });
			return res.status(200).json(cart);
		} catch (err) {
			return res.status(500).send(errors.getError('APP_01', 'cart', 500, err.message));
		}
	}
	
	/**
	 * update cart item quantity using the item_id in the request param
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with cart
	 * @memberof ShoppingCartController
	 */
	static async updateCartItem(req, res, next) {
		const { item_id } = req.params; // eslint-disable-line
		return res.status(200)
			.json({ message: 'this works' });
	}
	
	/**
	 * removes all items in a cart
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with cart
	 * @memberof ShoppingCartController
	 */
	static async emptyCart(req, res, next) {
		// implement method to empty cart
		return res.status(200)
			.json({ message: 'this works' });
	}
	
	/**
	 * remove single item from cart
	 * cart id is obtained from current session
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with message
	 * @memberof ShoppingCartController
	 */
	static async removeItemFromCart(req, res, next) {
		
		try {
			// implement code to remove item from cart here
		} catch (error) {
			return next(error);
		}
	}
	
	/**
	 * create an order from a cart
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with created order
	 * @memberof ShoppingCartController
	 */
	static async createOrder(req, res, next) {
		try {
			// implement code for creating order here
		} catch (error) {
			return next(error);
		}
	}
	
	/**
	 *
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with customer's orders
	 * @memberof ShoppingCartController
	 */
	static async getCustomerOrders(req, res, next) {
		const { customer_id } = req;  // eslint-disable-line
		try {
			// implement code to get customer order
		} catch (error) {
			return next(error);
		}
	}
	
	/**
	 *
	 *
	 * @static
	 * @param {obj} req express request object
	 * @param {obj} res express response object
	 * @returns {json} returns json response with order summary
	 * @memberof ShoppingCartController
	 */
	static async getOrderSummary(req, res, next) {
		const { order_id } = req.params;  // eslint-disable-line
		const { customer_id } = req;   // eslint-disable-line
		try {
			// write code to get order summary
		} catch (error) {
			return next(error);
		}
	}
	
	/**
	 * @static
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */
	static async processStripePayment(req, res, next) {
		const { currency, stripeToken, order_id, amount, description } = req.body; // eslint-disable-line
		const { customer_id, userData } = req;  // eslint-disable-line
		
		try {
			let order = await DatabaseWrapper.findOne(ORDER_MODAL, { order_id, customer_id });
			if (!order) {
				throw new Error('Order Does not exist')
			}
		} catch (e) {
			return res.status(400).json(errors.getError('ORD_01', 'order', 400));
		}
		
		try {
			const charge = await StripeHelper.makeCharge({
				amount,
				currency: currency || "usd",
				description,
				source: stripeToken,
				metadata: { customer_id, order_id }
			});
			const date = moment().format('ddd, MMM Do YYYY HH:mm');
			MailHelper.sendMail(
				userData.email,
				'Turing Shop <no-reply@turing.com>',
				'Payment Status',
				`Payment charge through ${date}, for order number ${order_id} has been received`,
				ShoppingCartController.sendMailHandler
			);
			
			return res.status(201).json(charge);
		} catch (error) {
			return res.status(400).json(
				errors.getError(
					'APP_01',
					error.param || '',
					error.statusCode || 400,
					error.message));
		}
	}
	
	static sendMailHandler(error, result) {
		if (error) {
			console.log(error);
			return;
		}
		console.log('Customer has been notified of the payment');
	}
}

export default ShoppingCartController;
