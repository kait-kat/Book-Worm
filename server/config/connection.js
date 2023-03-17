const mongoose = require('mongoose');

const db = "googlebooks"
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${db}`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	(err) => {
		if (err) {
			console.error(err)
		} else {
			console.log(`Connected to the ${db} database! ✅`)
		}
	},
)

module.exports = mongoose.connection