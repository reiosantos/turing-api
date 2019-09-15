import models from '../database/models';

const { Customer, Order, Product, ShoppingCart } = models;

class ModelFactory {
	/**
	 * Creates a modal of Type `name`
	 * Returns the modal matching the name or null
	 *
	 * @param name
	 * @returns Sequelize.Sequelize.Model.
	 */
	static getModel = (name) => {
		if (!name) return null;
		const modelName = name.toLowerCase();

		if (modelName.match(/^customers?$/)) return Customer;
		if (modelName.match(/^orders?$/)) return Order;
		if (modelName.match(/^products?$/)) return Product;
		if (modelName.match(/^shopping_cart?$/)) return ShoppingCart;

		return null;
	};
}

export default ModelFactory;
