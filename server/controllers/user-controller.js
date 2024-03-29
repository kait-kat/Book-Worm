const { User } = require('../models');
const { signToken } = require('../utils/auth.js');

async function createUser(req, res) {
	try {
		const user = await User.create(req.body)
		const token = signToken(user)
		res.json({ user, token })
	} catch (err) {
		console.log(err)
		res.status(500).json("Sorry, something went wrong.")
	}
}
async function getSingleUser(req, res) {
	try {
		const user = await User.findOne({
			$or: [
				{ _id: req.user ? req.user._id : req.params.id },
				{ username: req.params.username },
			],
		})
		if (!user) {
			return res.status(404).json("User not found.")
		}
		res.json(user)
	} catch (err) {
		console.log(err)
		res.status(500).json("Sorry, something went wrong.")
	}
}
async function login(req, res) {
	try {
		const user = await User.findOne({
			$or: [
				{ username: req.body.username },
				{ email: req.body.email },
			],
		})
		if (!user) {
			return res.status(404).json("User not found.")
		}
		const correctPassword = await user.isCorrectPassword(req.body.password)
		if (!correctPassword) {
			return res.status(401).json("Incorrect password.")
		}
		const token = signToken(user)    
		res.json({ user, token })
	} catch (err) {
		console.log(err)
		res.status(500).json("Sorry, something went wrong.")
	}
}
async function saveBook(req, res) {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $addToSet: { savedBooks: req.body } },
			{ new: true, runValidators: true },
		)
		return res.json(user)
	} catch (err) {
		console.log(err)
		res.status(500).json("Sorry, something went wrong.")
	}
}
async function deleteBook(req, res) {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $pull: { savedBooks: { bookId: req.params.bookId } } },
			{ new: true },
		)
		if (!user) {
			return res.status(404).json("User not found.")
		}
		return res.json(user)
	} catch (err) {
		console.log(err)
		res.status(500).json("Sorry, something went wrong.")
	}
}
module.exports = { createUser, getSingleUser, login, saveBook, deleteBook }