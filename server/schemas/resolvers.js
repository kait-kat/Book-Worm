const { User } = require("../models")
const { AuthenticationError } = require("apollo-server-express")
const { signToken } = require("../utils/auth")

const resolvers = {
	Query: {
		users: async () => {
			return await User.find()
		},
		user: async (parent, { username }) => {
			return await User.findOne({ username })
		},
	},
	Mutation: {
		signUp: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password })
			const token = signToken(user)
			return { user, token }
		},
		signIn: async (parent, { email, password }) => {
			const user = await User.findOne({ email })
			if (!user) {
				throw new AuthenticationError("User not found.")
			}
			const validPassword = await user.validatePassword(password)
			if (!validPassword) {
				throw new AuthenticationError("Incorrect password.")
			}
			const token = signToken(user)
			return { user, token }
		},
		saveBook: async (parent, { username, bookId, title, authors, description, image, link }) => {
			const user = await User.findOneAndUpdate(
				{ username },
				{ $addToSet: { savedBooks: { bookId, title, authors, description, image, link } } },
				{ new: true, runValidators: true },				
			)
			return user
		},
		deleteBook: async (parent, { username, bookId }) => {
			const user = await User.findOneAndUpdate(
				{ username },
				{ $pull: { savedBooks: { bookId: bookId } } },
				{ new: true },
			)
			if (!user) {
				return "User not found."
			}
			return user
		},
	},
}

module.exports = resolvers