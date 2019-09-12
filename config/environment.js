require('dotenv').config();

const generalOptionalEnvVariables = [
	'DATABASE_DIALECT',
	'DATABASE_HOST',
	'DATABASE_PORT',
	'DATABASE_PASSWORD'
];

const optionalEnvVariables = {
	development: generalOptionalEnvVariables,
	staging: generalOptionalEnvVariables,
	test: generalOptionalEnvVariables,
	production: generalOptionalEnvVariables
};

const envExists = (env) => {
	const undefinedVariables = Object.keys(env)
		.filter(variable => env[variable] === undefined
			&& !optionalEnvVariables[process.env.NODE_ENV].includes(variable));

	if (!undefinedVariables.length) return env;
	throw new Error(`
    \nThe following variables are required and missing in .env:
    \n${undefinedVariables.join('\n')}`);
};

const DB_URL = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const TEST_DB_URL = `mysql://${process.env.TEST_DB_USER}:${process.env.TEST_DB_PASS}@${process.env.TEST_DB_HOST}/${process.env.TEST_DB_NAME}`;

let DATABASE_URL = process.env.NODE_ENV === 'test' ? TEST_DB_URL : process.env.DATABASE_URL || DB_URL;

DATABASE_URL = process.env.NODE_ENV === 'travis-test' ? process.env.TEST_DATABASE_URL : DATABASE_URL;

const envVars = {
	PORT: process.env.PORT || 5000,
	DATABASE_URL,
	DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mysql',
	NODE_ENV: process.env.NODE_ENV || 'production'
};

const env = envExists(envVars);

module.exports = env;
