const mongoose = require('mongoose');

const db = "googlebooks"
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${db}`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((result) => {
	console.log(result);
})
.catch((err) => {
	console.log(mongoose.version);
	console.log("Unable to connect to MongoDB. Error: " + err);
});
module.exports = mongoose.connection