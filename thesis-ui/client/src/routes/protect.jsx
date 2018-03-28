import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

class Protected extends Component {
  componentDidMount() {
    try {
      const { exp } = jwtDecode(localStorage.token);
      if (exp < Math.floor(Date.now() / 1000)) {
        window.localStorage.clear();
        this.props.history.push('/login');
        location.reload();
      }
    } catch (e) {
      console.log('error in Protected ', e);
      this.props.history.push('/login');
    }
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}

export default Protected;
