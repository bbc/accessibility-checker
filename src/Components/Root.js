import React, { Component } from 'react'
import navigation from '../Common/Navigation'
import { withNavigation } from 'react-lrud';

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

export default withNavigation(Root)
