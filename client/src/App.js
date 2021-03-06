import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SingleMeal from './pages/SingleMeal';
import TopMenuBar from './components/TopMenuBar';
import Profile from './pages/Profile';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <TopMenuBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/profile' component={Profile} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path={'/meals/:mealId'} component={SingleMeal} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
