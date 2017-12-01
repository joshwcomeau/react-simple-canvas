import React, { Component, PropTypes } from 'react';

import { resetCtx } from '../../helpers';
import { applyStroke } from '../../helpers/stroke.helpers';
import { missingCoordinates } from '../../helpers/error-messages';
import { anyUndefined } from '../../utils';


// We can't use SFCs because SFCs can't return null.
// eslint-disable-next-line react/prefer-stateless-function
class Rect extends Component {
  render() {
    const { ctx } = this.context;
    const {
      x,
      y,
      width,
      height,
      rx,
      ry,
      stroke,
      fill,
    } = this.props;

    if (anyUndefined(x, y, width, height)) {
      // Don't throw a formal error (after all, an SVG would fail silently).
      // Instead, log an error, and return prematurely.
      console.error(missingCoordinates({ x, y, width, height }, this));
      return null;
    }

    ctx.rect(x, y, width, height);

    if (stroke && stroke !== 'none') {
      applyStroke(ctx, this.props);
    }

    if (fill && fill !== 'none') {
      ctx.fillStyle = fill;
      ctx.fill()
    }

    // Reset our global Canvas context so that subsequent components aren't
    // affected by anything we've done here.
    resetCtx(ctx);

    return null;
  }
};

Rect.displayName = 'Rect'

Rect.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rx: PropTypes.number,
  ry: PropTypes.number,
  stroke: PropTypes.string,
  fill: PropTypes.string,
};

Rect.contextTypes = {
  ctx: PropTypes.object,
};

Rect.defaultProps = {
  fill: '#000000',
};

export default Rect;
