import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Canvas from '../Canvas';
import Line from '../Line';


storiesOf('Line', module)
  .add('Simple line', () => (
    <Canvas width={250} height={250} style={{ border: '1px solid black' }}>
      <Line x1={20} y1={20} x2={60} y2={20} />
    </Canvas>
  ));
