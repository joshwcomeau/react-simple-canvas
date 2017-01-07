// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';

// We can't use SFCs because SFCs can't return null.
// eslint-disable-next-line react/prefer-stateless-function
class Line extends Component {
  render() {
    const { ctx, x1, y1, x2, y2, stroke, strokeWidth, strokeLinecap } = this.props;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = stroke;
    ctx.lineCap = strokeLinecap;

    ctx.stroke();

    // This component (and all canvas-rendered components) don't formally
    // render anything, at least not in the typical fashion. They return
    // null, so that they have no effect on the DOM, but they mutate the
    // canvas they're rendered into.
    return null;
  }
}

Line.defaultProps = {
  stroke: '#000000',
  strokeWidth: 1,
  strokeLinecap: 'butt',
};

Line.propTypes = {
  ctx: PropTypes.object,
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  strokeLinecap: PropTypes.oneOf(['butt', 'round', 'square']),
};

export default Line;
