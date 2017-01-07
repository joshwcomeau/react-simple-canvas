// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';

import { scaleCanvas } from '../../helpers';
import { omit } from '../../utils';


class Svg extends Component {
  getChildContext() {
    return { ctx: this.ctx };
  }

  componentDidMount() {
    // For testing purposes, we allow a mock context instance to be passed in.
    // In production code, `mockContext` is always undefined.
    this.ctx = this.props.mockContext || this.canvas.getContext('2d');

    scaleCanvas(this.canvas, this.ctx);

    // Annoyingly, canvas calculates from the half-pixel. We can undo this
    // by offsetting the canvas by half a pixel.
    this.ctx.translate(0.5, 0.5);

    // Our very first render exists purely to set the canvas ref.
    // Once that's done, immediately re-render, but this time we have the ref,
    // so we can render the children and pass them access to the canvas.
    this.forceUpdate();
  }

  // TODO: shouldComponentUpdate optimization, do some benchmarks.

  getDelegatedProps() {
    // We want to pass all props that AREN'T specified in this component to
    // the native <canvas> element.
    //
    // This is a somewhat controversial approach. In my opinion, though, when
    // creating these DOM-extension components, it's the nicest API by far,
    // and it's important for the developer experience. React will warn the
    // user if they pass illegitimate props to the <canvas> element :)
    return omit(this.props, Svg.propTypes);
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
        {isFirstRender ? null : children}
      </canvas>
    );
  }
}

Svg.childContextTypes = {
  ctx: PropTypes.object,
};

Svg.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mockContext: PropTypes.object,
};

Svg.defaultProps = {
  width: 800,
  height: 600,
};

export default Svg;
