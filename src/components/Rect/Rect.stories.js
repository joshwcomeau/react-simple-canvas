// @flow
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { createSvgDecorator } from '../../helpers/stories.helpers';
import SelfDrawing from '../../helpers/story-components/SelfDrawing';
import Rect from '../Rect';

storiesOf('Rect', module)
  .addDecorator(createSvgDecorator())
  .add('default', () => <Rect x={20} y={20} width={100} height={100} />)
  .add('custom fill', () => (
    <Rect x={20} y={20} width={100} height={100} fill="#F00" />
  ))
  .add('custom stroke', () => (
    <Rect x={20} y={20} width={100} height={100} stroke="#F00" fill="none" />
  ))
  .add('custom fill and stroke', () => (
    <Rect x={20} y={20} width={100} height={100} fill="#CCC" stroke="#333" />
  ))
  .add('stroke dasharray', () => (
    <Rect
      x={20}
      y={20}
      width={100}
      height={100}
      fill="none"
      stroke="#000"
      strokeDasharray={4}
    />
  ));

storiesOf('Rect - animation', module).add('with self-drawing stroke', () => {
  const SIDE_WIDTH = 200;

  return (
    <SelfDrawing perimeterLength={SIDE_WIDTH * 4}>
      <Rect
        x={25}
        y={25}
        width={SIDE_WIDTH}
        height={SIDE_WIDTH}
        stroke="red"
        fill="none"
        strokeWidth={2}
        strokeDasharray={SIDE_WIDTH * 4}
      />
    </SelfDrawing>
  );
});
