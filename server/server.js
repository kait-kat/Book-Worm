const express = require("express")
const path = require("path")
const { ApolloServer } = require("apollo-server-express")

const db = require("./config/connection")
const { typeDefs, resolvers } = require("./schemas")

const app = express()
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
	typeDefs,
	resolvers,
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")))
}

const startApolloServer = async (typeDefs, resolvers) => {
	await server.start()
	server.applyMiddleware({ app })
	db.once("open", () => {
		app.listen(PORT, () => {
			console.log(`API server listening on localhost:${PORT}!`)
			console.log(`GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
		})
	})
}

startApolloServer(typeDefs, resolvers)