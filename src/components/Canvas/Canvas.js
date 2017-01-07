// eslint-disable-next-line no-unused-vars
import React, { Component, PureComponent, PropTypes } from 'react';

import { scaleCanvas } from '../../helpers';
import { omit } from '../../utils';


// If the user is running React >= 15.3.0, we can use PureComponent.
// Otherwise, fall back to a regular one
const ExtendedComponent = PureComponent || Component;

class Canvas extends ExtendedComponent {
  constructor(props) {
    super(props);

    this.cloneChildrenWithCtx = this.cloneChildrenWithCtx.bind(this);
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    scaleCanvas(this.canvas, this.ctx);

    // Our very first render exists purely to set the canvas ref.
    // Once that's done, immediately re-render, but this time we have the ref,
    // so we can render the children and pass them access to the canvas.
    this.forceUpdate();
  }

  getDelegatedProps() {
    // We want to pass all props that AREN'T specified in this component to
    // the native <canvas> element.
    //
    // This is a somewhat controversial approach. In my opinion, though, when
    // creating these DOM-extension components, it's the nicest API by far,
    // and it's important for the developer experience. React will warn the
    // user if they pass illegitimate props to the <canvas> element :)
    return omit(this.props, Canvas.propTypes);
  }

  cloneChildrenWithCtx(children) {
    if (!children) {
      return null;
    }

    if (Array.isArray(children)) {
      return children.map(this.cloneChildrenWithCtx);
    }

    return React.cloneElement(children, { ctx: this.ctx });
  }

  render() {
    const { width, height, children } = this.props;

    const isFirstRender = !this.canvas;

    // Before every render, clear the canvas
    if (!isFirstRender) {
      this.ctx.clearRect(0, 0, width, height);
    }

    return (
      <canvas
        ref={(c) => { this.canvas = c; }}
        {...this.getDelegatedProps()}
        width={width}
        height={height}
      >
        {isFirstRender ? null : this.cloneChildrenWithCtx(children)}
      </canvas>
    );
  }
}

Canvas.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Canvas.defaultProps = {
  width: 800,
  height: 600,
};

export default Canvas;
