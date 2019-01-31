import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth';
import Header from './components/layout/Header';
import Dashboard from './components/items/Dashboard';
import InputForm from './components/items/InputForm';
import { Provider } from 'react-redux';
import Help from './components/pages/Help';
import Dmca from './components/pages/Dmca';
import NotFound from './components/pages/NotFound';
import SeeNotes from './components/pages/SeeNotes';
import EditForm from './components/items/EditForm';
import store from './store';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';




class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/add" component={UserIsAuthenticated(InputForm)}/>
                <Route exact path="/edit/:id" component={UserIsAuthenticated(EditForm)}/>
                <Route exact path="/help" component={Help}/>
                <Route exact path="/dmca" component={Dmca}/>
                <Route exact path="/seenotes" component={SeeNotes}/>
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
