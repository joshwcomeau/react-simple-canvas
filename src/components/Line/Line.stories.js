// @flow
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { createSvgDecorator } from '../../helpers/stories.helpers';
import SelfDrawing from '../../helpers/story-components/SelfDrawing';
import G from '../G';
import Svg from '../Svg';
import Line from '../Line';

storiesOf('Line', module)
  .addDecorator(createSvgDecorator())
  .add('with default values for most fields', () => (
    <Line x1={20} y1={20} x2={60} y2={20} />
  ))
  .add('with custom stroke and width', () => (
    <G>
      <Line
        key="line-1"
        x1={-5}
        y1={-5}
        x2={255}
        y2={255}
        stroke="#FF0000"
        strokeWidth={10}
      />
      <Line
        key="line-2"
        x1={255}
        y1={-5}
        x2={-5}
        y2={255}
        stroke="#FF0000"
        strokeWidth={10}
      />
    </G>
  ))
  .add('with custom linecaps', () => (
    <G>
      <Line
        key="line-1"
        x1={25}
        y1={25}
        x2={25}
        y2={225}
        stroke="red"
        strokeWidth={10}
        strokeLinecap="butt"
      />
      <Line
        key="line-2"
        x1={125}
        y1={25}
        x2={125}
        y2={225}
        stroke="green"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <Line
        key="line-3"
        x1={225}
        y1={25}
        x2={225}
        y2={225}
        stroke="blue"
        strokeWidth={10}
        strokeLinecap="square"
      />
    </G>
  ))
  .add('with opacity', () => (
    <G>
      {[0, 25, 50, 75, 100, 125, 150, 175, 200, 225].map((pos, index) => (
        <Line
          key={pos}
          x1={25}
          y1={pos}
          x2={225}
          y2={pos}
          strokeOpacity={index / 10}
        />
      ))}
    </G>
  ))
  .add('with custom dashes', () => (
    <G>
      <Line
        key="line-1"
        x1={25}
        y1={50}
        x2={225}
        y2={50}
        strokeWidth={2}
        strokeDasharray={5}
      />
      <Line
        key="line-2"
        x1={25}
        y1={125}
        x2={225}
        y2={125}
        strokeWidth={2}
        strokeDasharray="20, 5, 2, 5"
      />
      <Line
        key="line-3"
        x1={25}
        y1={200}
        x2={225}
        y2={200}
        strokeWidth={2}
        strokeDasharray={[0, 4, 10, 4]}
        strokeLinecap="round"
      />
    </G>
  ));

storiesOf('Line - animations', module)
  .add('with offset animation', () => {
    class AnimatedLines extends Component {
      constructor(props) {
        super(props);

        this.updateAnimation = this.updateAnimation.bind(this);

        this.state = {
          offset: 0,
        };
      }

      componentDidMount() {
        this.updateAnimation();
      }

      updateAnimation() {
        // eslint-disable-next-line no-undef
        window.requestAnimationFrame(() => {
          this.setState(
            { offset: this.state.offset - 5 },
            this.updateAnimation,
          );
        });
      }

      render() {
        return (
          <Svg width={250} height={250} style={{ border: '1px solid #888' }}>
            <Line
              key="line-1"
              x1={25}
              y1={50}
              x2={225}
              y2={50}
              strokeWidth={2}
              strokeDasharray={50}
              strokeDashoffset={this.state.offset}
            />
            <Line
              key="line-2"
              x1={25}
              y1={200}
              x2={225}
              y2={200}
              strokeWidth={2}
              strokeDasharray={50}
              strokeDashoffset={this.state.offset * -1}
            />
          </Svg>
        );
      }
    }

    return <AnimatedLines />;
  })
  .add('with array animation', () => {
    class AnimatedLines extends Component {
      constructor(props) {
        super(props);

        this.updateAnimation = this.updateAnimation.bind(this);

        this.state = {
          array: 0,
        };
      }

      componentDidMount() {
        this.updateAnimation();
      }

      updateAnimation() {
        // eslint-disable-next-line no-undef
        window.requestAnimationFrame(() => {
          this.setState({ array: this.state.array + 1 }, this.updateAnimation);
        });
      }

      render() {
        return (
          <Svg width={250} height={250} style={{ border: '1px solid #888' }}>
            <Line
              key="line-1"
              x1={25}
              y1={50}
              x2={225}
              y2={50}
              strokeWidth={2}
              strokeDasharray={this.state.array * 0.1}
            />
            <Line
              key="line-2"
              x1={25}
              y1={125}
              x2={225}
              y2={125}
              strokeWidth={2}
              strokeDasharray={this.state.array * 0.2}
            />
            <Line
              key="line-3"
              x1={25}
              y1={200}
              x2={225}
              y2={200}
              strokeWidth={2}
              strokeDasharray={this.state.array * 0.4}
            />
          </Svg>
        );
      }
    }

    return <AnimatedLines />;
  })
  .add('with self-drawing animation', () => {
    const LINE_WIDTH = 200;

    return (
      <SelfDrawing perimeterLength={LINE_WIDTH}>
        <Line
          key="line-1"
          x1={25}
          y1={125}
          x2={225}
          y2={125}
          strokeWidth={2}
          strokeDasharray={LINE_WIDTH}
        />
      </SelfDrawing>
    );
  });
