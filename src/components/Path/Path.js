// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parsePath from 'parse-svg-path';

import { DEFAULT_STROKE_PROPS } from '../../constants';
import { resetCtx } from '../../helpers';
import { applyStroke } from '../../helpers/stroke.helpers';
import { missingCoordinates } from '../../helpers/error-messages';
import { anyUndefined } from '../../utils';

import type { strokeAttributes } from '../../types';

type Props = {
  d?: string | Array<string>,
  ...strokeAttributes,
};

// We can't use SFCs because SFCs can't return null.
// eslint-disable-next-line react/prefer-stateless-function
class Path extends Component<Props> {
  static defaultProps = {
    ...DEFAULT_STROKE_PROPS,
  };

  static contextTypes = {
    ctx: PropTypes.object,
  };

  handleInstruction = ([instruction: string, ...instructionArgs]) => {
    const { ctx } = this.context;

    switch (instruction) {
      case 'M': {
        const [x, y] = instructionArgs;
        ctx.moveTo(x, y);
        return;
      }

      case 'L': {
        const [x, y] = instructionArgs;
        ctx.lineTo(x, y);
        return;
      }
    }
  };

  render() {
    const { ctx } = this.context;
    const {
      stroke,
      strokeDasharray,
      strokeDashoffset,
      strokeLinecap,
      strokeOpacity,
      strokeWidth,
      fill,
    } = this.props;
    let { d } = this.props;

    if (typeof d === 'undefined') {
      return null;
    }

    // For convenience, an array can be passed for `d`.
    // If so, just join it with spaces so that our path parser understands it.
    if (Array.isArray(d)) {
      d = d.join(' ');
    }

    const pathInstructions: Array<Array<any>> = parsePath(d);

    ctx.beginPath();

    pathInstructions.forEach(this.handleInstruction);

    if (stroke && stroke !== 'none') {
      applyStroke(ctx, this.props);
    }

    if (fill && fill !== 'none') {
      ctx.fillStyle = fill;
      ctx.fill();
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

export default Path;
