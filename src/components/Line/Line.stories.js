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
    </Canvas>
  ))
  .add('custom linecaps', () => (
    <Canvas width={250} height={250} style={{ border: '1px solid black' }}>
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
    </Canvas>
  ))
  .add('dashed lines', () => (
    <Canvas width={250} height={250} style={{ border: '1px solid black' }}>
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
    </Canvas>
  ));
