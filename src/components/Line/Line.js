// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';

import { resetCtx } from '../../helpers';
import { applyStroke } from '../../helpers/stroke.helpers';
import { missingCoordinates } from '../../helpers/error-messages';
import { anyUndefined } from '../../utils';


// We can't use SFCs because SFCs can't return null.
// eslint-disable-next-line react/prefer-stateless-function
class Line extends Component {
  render() {
    const { ctx } = this.context;
    const {
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


    if (anyUndefined(x1, y1, x2, y2)) {
      // Don't throw a formal error (after all, an SVG would fail silently).
      // Instead, log an error, and return prematurely.
      console.error(missingCoordinates({ x1, y1, x2, y2 }, this));
      return null;
    }

    ctx.beginPath();

    // Frustratingly, the line API works on half-pixels, so we'll get blurry
    // lines unless we offset by 0.5 pixels.
    ctx.moveTo(x1 + 0.5, y1 + 0.5);
    ctx.lineTo(x2 + 0.5, y2 + 0.5);

    if (stroke) {
      applyStroke(ctx, this.props);
    }

    ctx.closePath();

    // Reset our global Canvas context so that subsequent components aren't
    // affected by anything we've done here.
    resetCtx(ctx);

    // This component (and all canvas-rendered components) don't formally
    // render anything, at least not in the typical fashion. They return
    // null, so that they have no effect on the DOM, but they mutate the
    // canvas they're rendered into.
    return null;
  }
}

Line.displayName = 'Line';

Line.defaultProps = {
  stroke: '#000000',
  strokeDashoffset: 0,
  strokeLinecap: 'butt',
  strokeWidth: 1,
};

Line.propTypes = {
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
  strokeOpacity: PropTypes.number,
  strokeWidth: PropTypes.number.isRequired,
};

Line.contextTypes = {
  ctx: PropTypes.object,
};

export default Line;
