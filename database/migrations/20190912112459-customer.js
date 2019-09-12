module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('customer', {
		customer_id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		name: {
			allowNull: false,
			type: Sequelize.STRING
		},
		email: {
			allowNull: false,
			unique: true,
			type: Sequelize.STRING
		},
		password: Sequelize.STRING,
		address_1: Sequelize.STRING,
		address_2: Sequelize.STRING,
		city: Sequelize.STRING,
		region: Sequelize.STRING,
		postal_code: Sequelize.STRING,
		country: Sequelize.STRING,
		shipping_region_id: Sequelize.INTEGER,
		day_phone: Sequelize.STRING,
		eve_phone: Sequelize.STRING,
		mob_phone: Sequelize.STRING,
		credit_card: Sequelize.STRING
	}),
	/* eslint-disable no-unused-vars */
	down: (queryInterface, Sequelize) => queryInterface.dropTable('customer')
};
