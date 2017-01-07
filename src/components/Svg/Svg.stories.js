import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Svg from '../Svg';


storiesOf('Svg', module)
  .add('default view (renders a canvas with border)', () => (
    <Svg width={250} height={250} style={{ border: '1px solid black' }} />
  ));
