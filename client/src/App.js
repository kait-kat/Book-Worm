import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks.js';
import SavedBooks from './pages/SavedBooks.js';
import Navbar from './components/Navbar.js';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
})

function App() {
  return (
      <ApolloProvider client={client}>
      <Router>
        <>
      <Navbar />
          <Routes>
            <Route exact path="/search" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Routes>
          </>
    </Router>
    </ApolloProvider>
  )
}

export default App;