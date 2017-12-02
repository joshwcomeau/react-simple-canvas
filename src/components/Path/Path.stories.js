// @flow
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { createSvgDecorator } from '../../helpers/stories.helpers';
import G from '../G';
import Svg from '../Svg';
import Path from '../Path';

storiesOf('Path', module)
  .addDecorator(createSvgDecorator())
  .add('simple line path', () => <Path d="M 20,20 L 80,20" />)
  .add('scribbled line path', () => (
    <Path d="M 100,100 L 0,20 L 40,120 L 200,0 L 12,34 L 0,174" />
  ))
  .add('multiple line segments', () => (
    <Path
      d={[
        'M 50,20',
        'L 50,100',
        'M 100,20',
        'L 100,100',
        'M 150,20',
        'L 150 100',
        'M 200,20',
        'L 200,100',
      ]}
    />
  ))
  .add('filled', () => (
    <Path
      d={[
        'M 125,50',
        'L 175,200',
        'L 50,100',
        'L 200,100',
        'L 75,200',
        'L 125,50',
      ]}
      fill="#FFD700"
      stroke={null}
      strokeWidth={0}
    />
  ));
