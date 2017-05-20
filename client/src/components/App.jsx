import React from 'react';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import CreateTrip from './CreateTrip';
import ContributeTrip from './ContributeTrip';

import HomeCh from './Home-ch';
import SignupCh from './Signup-ch';
import LoginCh from './Login-ch';
import ProfileCh from './Profile-ch';
import CreateTripCh from './CreateTrip-ch';
import ContributeTripCh from './ContributeTrip-ch';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: '',
      currentTrip: '',
      chinese: false
    }
    this.checkUser = this.checkUser.bind(this);
    this.updateCurrentTrip = this.updateCurrentTrip.bind(this);
    this.translateChinese = this.translateChinese.bind(this);
    this.translateEnglish = this.translateEnglish.bind(this);
  }

  checkUser(user) {
    console.log('setting checkUser ',user )
    this.setState({
      loggedInUser: user
    });
  }

  updateCurrentTrip(trip) {
    this.setState({
      currentTrip: trip
    });
  }

  translateChinese(){
    this.setState({
      chinese: true
    });
    console.log('translateChinese was clicked');
  }

  translateEnglish(){
    this.setState({
      chinese: false
    });
    console.log('translateEnglish was clicked');
  }


  render() {
    if (this.state.chinese){
      console.log('this page should be in chinese');
    }
    if(!this.state.chinese){
      console.log('this page should be in english');
    }
    return (
      <div>
        <Router>
            <div>
                <button className="translate" onClick={this.translateChinese}>中文</button>
                <button className="translate" onClick={this.translateEnglish}>English</button>
                { this.state.chinese ?
                  <div>
                  <Route exact path="/" render={(props) => (<HomeCh loggedInUser={this.state.loggedInUser} checkUser={this.checkUser} {...props} />)} />
                  <Route path="/signup" render={(props) => (<SignupCh checkUser={this.checkUser} loggedInUser={this.state.loggedInUser} {...props} />)} />
                  <Route path="/login" render={(props) => (<LoginCh checkUser={this.checkUser} loggedInUser={this.state.loggedInUser} {...props} />)} />
                  <Route path="/profile" render={(props) => (<ProfileCh loggedInUser={this.state.loggedInUser} updateCurrentTrip={this.updateCurrentTrip} currentTrip={this.state.currentTrip} {...props} />)} />
                  <Route path="/createTrip" render={(props) => (!this.state.loggedInUser ?
                      (<Redirect to="/login"/>) : (<CreateTripCh loggedInUser={this.state.loggedInUser} {...props} />))} />
                  <Route path="/contributeTrip" render={(props) => (!this.state.loggedInUser ?
                    (<Redirect to="/login"/>) : (<ContributeTripCh loggedInUser={this.state.loggedInUser} currentTrip={this.state.currentTrip} {...props} />))} />
                </div>
                  :
                  <div>
                  <Route exact path="/" render={(props) => (<Home loggedInUser={this.state.loggedInUser} checkUser={this.checkUser} {...props} />)} />
                  <Route path="/signup" render={(props) => (<Signup checkUser={this.checkUser} loggedInUser={this.state.loggedInUser} {...props} />)} />
                  <Route path="/login" render={(props) => (<Login checkUser={this.checkUser} loggedInUser={this.state.loggedInUser} {...props} />)} />
                  <Route path="/profile" render={(props) => (<Profile loggedInUser={this.state.loggedInUser} updateCurrentTrip={this.updateCurrentTrip} currentTrip={this.state.currentTrip} {...props} />)} />
                  <Route path="/createTrip" render={(props) => (!this.state.loggedInUser ?
                      (<Redirect to="/login"/>) : (<CreateTrip loggedInUser={this.state.loggedInUser} {...props} />))} />
                  <Route path="/contributeTrip" render={(props) => (!this.state.loggedInUser ?
                    (<Redirect to="/login"/>) : (<ContributeTrip loggedInUser={this.state.loggedInUser} currentTrip={this.state.currentTrip} {...props} />))} />
                </div>
                }
            </div>
        </Router>
      </div>
  )}
}


export default App;
