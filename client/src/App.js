import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import AddPokemon from './pages/AddPokemon';
import Footer from './components/Footer';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Pokemon from './pages/Pokemon';
import EditPokemon from './pages/EditPokemon';

import './global.css';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <div className="row mt-5 mb-3"> {/* Had to individually add row/col to each route bc it was affecting Welcome */}
            <div className="col-11 mx-auto">
              <Login />
            </div>
          </div>
        </Route>
        <Route exact path="/signUp">
          <div className="row mt-5 mb-3">
            <div className="col-11 mx-auto">
              <SignUp />
            </div>
          </div>
        </Route>
        <Route exact path="/addPokemon">
          <div className="row mt-5 mb-3">
            <div className="col-11 mx-auto">
              <AddPokemon />
            </div>
          </div>
        </Route>
        <Route exact path="/pokemon/:pokemonId">
          <div className="row mt-5 mb-3">
            <div className="col-11 mx-auto">
              <Pokemon />
            </div>
          </div>
        </Route>
        <Route exact path="/editPokemon/:pokemonId">
          <div className="row mt-5 mb-3">
            <div className="col-11 mx-auto">
              <EditPokemon />
            </div>
          </div>
        </Route>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
