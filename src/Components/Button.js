import React, { Component } from 'react'
import navigation from '../Common/Navigation'
import { withNavigation } from 'react-lrud';
import classnames from 'classnames';

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  forwardRef = ref => {
    if (!this.ref) {
      this.ref = ref;

      this.props.forwardRef(ref, this.props.id);
    }
  }

  render() {
    let buttonRef = this.props.id
    let orientation
    if (this.props.vertical) orientation = 'vertical'
    if (this.props.horizontal) orientation = 'horizontal'

    const forwardRef = this.props.forwardRef && this.props.id;

    return (
      <div
        className={classnames(this.props.className, { focused: this.props.focused === this.props.id })}
        role="button"
        ref={ref => forwardRef && this.forwardRef(ref)}
      >
        {this.props.id}
      </div>
    )
  }
}

export default withNavigation(Button)
