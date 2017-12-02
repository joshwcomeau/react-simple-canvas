// @flow
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { range, random } from '../src/utils';

import Svg from '../src/components/Svg';
import Path from '../src/components/Path';

type Props = {
  size: number,
  children: (points: Array<number>) => any,
};

type State = {
  points: Array<number>,
};

class RandomPathAnimator extends Component {
  state = {
    points: [],
  };

  animationFrameId: number;

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  generatePoints = () => {
    return (
      'M 0,0 ' +
      range(600)
        .map(() => {
          const x = random(0, 800);
          const y = random(0, 600);

          return `L ${x},${y}`;
        })
        .join(' ')
    );
  };

  tick = () => {
    this.setState({
      points: this.generatePoints(),
    });

    this.animationFrameId = window.requestAnimationFrame(this.tick);
  };

  render() {
    return this.props.children(this.state.points);
  }
}

storiesOf('Performance tests', module)
  .add('50-point animated path - SimpleCanvas', () => (
    <RandomPathAnimator size={250}>
      {points => (
        <Svg>
          <Path d={points} />
        </Svg>
      )}
    </RandomPathAnimator>
  ))
  .add('50-point animated path - SVG', () => (
    <RandomPathAnimator size={250}>
      {points => (
        <svg width={800} height={600}>
          <path d={points} stroke="black" fill="none" />
        </svg>
      )}
    </RandomPathAnimator>
  ));
