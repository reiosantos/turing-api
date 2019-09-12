module.exports = (sequelize, DataTypes) => {
	const Customer = sequelize.define('customer', {
		customer_id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		email: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		address_1: DataTypes.STRING,
		address_2: DataTypes.STRING,
		city: DataTypes.STRING,
		region: DataTypes.STRING,
		postal_code: DataTypes.STRING,
		country: DataTypes.STRING,
		shipping_region_id: DataTypes.INTEGER,
		day_phone: DataTypes.STRING,
		eve_phone: DataTypes.STRING,
		mob_phone: DataTypes.STRING,
		credit_card: DataTypes.STRING
	}, {});
	return Customer;
};
