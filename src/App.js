import React, { Component } from "react";
//import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./components/actions/authActions";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  componentDidMount(){
    let  userDetails = {userDetails:[]};
      if(localStorage.getItem('userDetails.userDetails') === null 
        || localStorage.getItem('userDetails.userDetails') === 'undefined'){
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
      }else{
        console.log('userdetails item already exist')
        console.log(userDetails);
        console.log('length is');
        console.log(Object.keys(userDetails).length);
      }    
   }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
