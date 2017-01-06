// eslint-disable-next-line no-unused-vars
import React, { Component, PureComponent, PropTypes } from 'react';


// If the user is running React >= 15.3.0, we can use PureComponent.
// Otherwise, fall back to a regular one
const ExtendedComponent = PureComponent || Component;

class Canvas extends ExtendedComponent {
  render() {
    return (
      <div>TODO</div>
    );
  }
}

export default Canvas;
