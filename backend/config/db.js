const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URL;

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once('open' , () => {
	console.log('connected to mongo DB');
})