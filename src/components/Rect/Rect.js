import React, { Component, PropTypes } from 'react';


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

    ctx.rect(x, y, width, height);

    if (stroke && stroke !== 'none') {
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }

    if (fill && fill !== 'none') {
      ctx.fillStyle = fill;
      ctx.fill()
    }

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
