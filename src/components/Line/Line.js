// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_STROKE_PROPS } from '../../constants';
import { resetCtx } from '../../helpers';
import { applyStroke } from '../../helpers/stroke.helpers';
import { missingCoordinates } from '../../helpers/error-messages';
import { anyUndefined } from '../../utils';

import type { strokeAttributes } from '../../types';

type Props = {
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number,
  ...strokeAttributes,
};

// We can't use SFCs because SFCs can't return null.
// eslint-disable-next-line react/prefer-stateless-function
class Line extends Component<Props> {
  static defaultProps = {
    ...DEFAULT_STROKE_PROPS,
  };

  static contextTypes = {
    ctx: PropTypes.object,
  };

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

export default Line;
