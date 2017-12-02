// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_STROKE_PROPS } from '../../constants';
import { resetCtx } from '../../helpers';
import { applyStroke } from '../../helpers/stroke.helpers';
import { missingCoordinates } from '../../helpers/error-messages';
import { anyUndefined } from '../../utils';

import type { strokeAttributes, fillAttributes } from '../../types';

type Props = {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  ...strokeAttributes,
  ...fillAttributes,
};

// We can't use SFCs because SFCs can't return null.
// eslint-disable-next-line react/prefer-stateless-function
class Rect extends Component<Props> {
  static defaultProps = {
    ...DEFAULT_STROKE_PROPS,
  };

  static contextTypes = {
    ctx: PropTypes.object,
  };

  render() {
    const { ctx } = this.context;
    const { x, y, width, height, stroke, fill } = this.props;

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
      ctx.fill();
    }

    // Reset our global Canvas context so that subsequent components aren't
    // affected by anything we've done here.
    resetCtx(ctx);

    return null;
  }
}

export default Rect;
