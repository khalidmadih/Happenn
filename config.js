exports.DATABASE_URL = process.env.DATABASE_URL || process.env.MONGODB_URI ||
											global.DATABASE_URL ||
											'mongodb://localhost/happenn-app';
exports.TEST_DATABASE_URL = process.env.DATABASE_URL ||
											global.DATABASE_URL ||
											'mongodb://localhost/test-happenn-app';
exports.PORT = process.env.PORT || 8080;
