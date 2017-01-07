// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';

import { getDashArray } from '../../helpers';


// We can't use SFCs because SFCs can't return null.
// eslint-disable-next-line react/prefer-stateless-function
class Line extends Component {
  render() {
    const {
      ctx,
      x1,
      y1,
      x2,
      y2,
      stroke,
      strokeDasharray,
      strokeDashoffset,
      strokeLinecap,
      strokeOpacity,
      strokeWidth,
    } = this.props;

    if (strokeDasharray) {
      const dashArray = getDashArray(strokeDasharray, this);
      ctx.setLineDash(dashArray);
      ctx.lineDashOffset = strokeDashoffset;
    }

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
  strokeDashoffset: 0,
  strokeLinecap: 'butt',
  strokeOpacity: 1,
  strokeWidth: 1,
};

Line.propTypes = {
  ctx: PropTypes.object,
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
  strokeDasharray: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  strokeDashoffset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  strokeLinecap: PropTypes.oneOf(['butt', 'round', 'square']),
  strokeOpacity: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
};

export default Line;