import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Canvas from '../Canvas';


storiesOf('Canvas', module)
  .add('default view (renders a canvas with border)', () => (
    <Canvas width={250} height={250} style={{ border: '1px solid black' }} />
  ));
