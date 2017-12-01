import React, { Component } from 'react';

import Svg from '../../components/Svg';

// This is the common effect people use to create shapes that draw themselves.
export default class SelfDrawingLine extends Component {
  constructor(props) {
    super(props);

    this.updateAnimation = this.updateAnimation.bind(this);

    this.state = {
      direction: 'growing',
      offset: 0,
    };
  }

  componentDidMount() {
    this.updateAnimation();
  }

  updateAnimation() {
    const { direction, offset } = this.state;
    const { perimeterLength } = this.props;

    // eslint-disable-next-line no-undef
    window.requestAnimationFrame(() => {
      this.setState({
        offset: this.state.offset + 5,
      }, this.updateAnimation);
    });
  }

  render() {
    const { children } = this.props;

    const child = React.cloneElement(React.Children.only(children), {
      strokeDashoffset: this.state.offset,
    });

    return (
      <Svg width={250} height={250} style={{ border: '1px solid #888' }}>
        {child}
      </Svg>
    );
  }
}
