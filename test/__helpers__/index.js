import chai from 'chai';
import server from '../../src';
import ModelFactory from '../../src/models/models.factory';

const UserModel = ModelFactory.getModel('customer');

const deleteAllModals = async () => {
	await UserModel.destroy({ where: {} });
};

const login = async () => {
	await deleteAllModals();

	await chai.request(server)
		.post('/api/customers')
		.send({
			password: 'santos',
			email: 'email@turing.com',
			name: 'ronald'
		});

	const loggedInUser = await chai.request(server)
		.post('/api/customers/login')
		.send({
			email: 'email@turing.com',
			password: 'santos'
		});

	return loggedInUser.body.access_token;
};

export { login, deleteAllModals };
