import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/index.jsx';
import { addDataToStore } from './actions';
import Chat from './components/Chat/Chat.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';
import Protected from './routes/protect.jsx';
import Rt from './routes/app.jsx';
import PhotoUpload from './components/Photo';
import './styles.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  getRoute() {
    return this.props.location.pathname !== '/maps';
  }
  render() {
    return (
      <div>
        <Navbar />
        <hr />
        <PhotoUpload />
        <hr />
        <div ref="mainPanel">
          <div>
            <Switch>
              {Rt.appRoutes.map((route, key) => {
                // if (prop.redirect) {
                //   return <Redirect from={prop.path} to={prop.to} key={key} />;
                // }
                if (route.protected) {
                  return (
                    <Route
                      path={route.path}
                      key={key}
                      component={props => (
                        <Protected component={route.component} {...props} />
                      )}
                    />
                  );
                }
                return (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dataFromReduxStorage: state.dataReducers
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addDataToStore
    },
    dispatch
  );
}

export default App;
