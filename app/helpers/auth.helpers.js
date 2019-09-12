// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const expiryDate = {
	exp: 2,
	hrs: '48h'
};

export function validatePassword(plain, hashed) {
	return Promise.resolve(plain === hashed.split('').reverse().join(''));
	// TODO: Commented out due to the pass length of the string created by bcrypt (60+) we need
	//  a max of 50
	// return bcrypt.compare(plain, hashed);
}

export async function hashPassword(password) {
	return Promise.resolve(password.split('').reverse().join(''));
	// TODO: Commented out due to the pass length of the string created by bcrypt (60+) we need
	//  a max of 50
	// const SALT_WORK_FACTOR = 10;
	// const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
	// return bcrypt.hash(password, salt);
}

export function generateJWTToken(userObject) {
	const today = new Date();
	const expiry = new Date(today);

	expiry.setDate(today.getDate() + expiryDate.exp);
	return jwt.sign({
		identity: userObject.customer_id,
		exp: Number.parseInt(expiry.getTime() / 100, 10)
	}, process.env.JWT_SECRET);
}

export function toAuthJSON(userObject, token) {
	if (userObject.password) delete userObject.password;
	return {
		customer: userObject,
		access_token: 'Bearer ' + token,
		expires_in: expiryDate.hrs
	};
}
