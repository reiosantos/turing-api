import chai from 'chai';
import server from '../../src';

const login = async () => {
	const loggedInUser = await chai.request(server)
		.post('/api/customers/login')
		.send({
			email: 'email@turing.com',
			password: 'santos'
		});

	return loggedInUser.body.access_token;
};

export { login };
