const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const {DATABASE_URL, PORT} = require('./config');

const app = express();

// Read JSON
app.use(bodyParser.json());
// Read the static file from public
app.use(express.static('views/build'));

// Use ES6 promise instead of mongoose promise, but why? Need to research later.
mongoose.Promise = global.Promise;

// Get router
// Need to research on {} return. Why it will give type error?
const eventRouter = require('./router/eventRouter');
const userRouter = require('./router/userRouter');
const eventRouterDemo = require('./router/demo/eventRouter');
const userRouterDemo = require('./router/demo/userRouter');

app.get('/', (req, res) => {
	res.redirect(301, 'index.html') 
});

app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/demo/user', userRouterDemo);
app.use('/api/demo/event', eventRouterDemo);

// app.get('/', (req, res) => {
// 	res.redirect('/home');
// })

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
	
	// console.log("Database: ", databaseUrl);
	// console.log("Port:", port);
	
	return new Promise((resolve, reject) => {
		// Connect mongoose to the configured URL
		// console.log("Connecting to database...")
		mongoose.connect(databaseUrl, function(err) {
			if (err) {
				// console.log("Failed to connect to database.");

				/* istanbul ignore next */
				return reject(err);
			}
		});

		// console.log("Successfully connected to database.");
		// console.log("Creating server...");
		// Listening to the server
		server = app.listen(port, () => {
			console.log(`Server is created and running on port ${port}`);
			resolve(server);
		}).on('error', err => {
			// console.log("Failed to create server");
			/* istanbul ignore next */
			reject(err);
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			// console.log("Closing Server...");
			server.close(err => {
				if (err) {
					// console.log("Unable to close server.");

					/* istanbul ignore next */
					reject(err);
				}
				// console.log("Server is closed.");
				resolve();
			});
		});
	});
}

// To run the application, Need to ask why?
if (require.main === module) {
	/* istanbul ignore next */
	runServer().catch(err => {  
		console.log(err)
	});
}

module.exports = {app, runServer, closeServer}