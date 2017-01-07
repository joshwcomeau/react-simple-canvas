import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Canvas from '../Canvas';
import Line from '../Line';


storiesOf('Line', module)
  .add('Simple line', () => (
    <Canvas width={250} height={250} style={{ border: '1px solid black' }}>
      <Line x1={20} y1={20} x2={60} y2={20} />
    </Canvas>
  ))
  .add('custom stroke and width', () => (
    <Canvas width={250} height={250} style={{ border: '1px solid black' }}>
      <Line
        x1={0}
        y1={0}
        x2={250}
        y2={250}
        stroke="#FF0000"
        strokeWidth={10}
      />
      <Line
        x1={250}
        y1={0}
        x2={0}
        y2={250}
        stroke="#FF0000"
        strokeWidth={10}
      />
    </Canvas>
  ))
  .add('custom linecap', () => (
    <Canvas width={250} height={250} style={{ border: '1px solid black' }}>
      <Line
        x1={25}
        y1={25}
        x2={25}
        y2={225}
        stroke="red"
        strokeWidth={10}
        strokeLinecap="butt"
      />
      <Line
        x1={125}
        y1={25}
        x2={125}
        y2={225}
        stroke="green"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <Line
        x1={225}
        y1={25}
        x2={225}
        y2={225}
        stroke="blue"
        strokeWidth={10}
        strokeLinecap="square"
      />
    </Canvas>
  ));
