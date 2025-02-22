import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Route, hashHistory, IndexRoute, Router } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

// const networkInterface = createNetworkInterface({
//   uri: '/graphql',
//   opts: {
//     credentials: 'same-origin '
//   }
// });

const client = new ApolloClient({
  // networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/signup" component={SignupForm}></Route>
          // requireAuth is to check if the user logged in is authorized or not. If not authorized, the user has to be redirected to /login
          <Route path="/dashboard" component={requireAuth(Dashboard)}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
