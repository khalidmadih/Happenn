exports.DATABASE_URL = process.env.DATABASE_URL ||
											global.DATABASE_URL ||
											'mongodb://localhost/musico-react-app';
exports.TEST_DATABASE_URL = process.env.DATABASE_URL ||
											global.DATABASE_URL ||
											'mongodb://localhost/test-musico-react-app';
exports.PORT = process.env.PORT || 8080;
