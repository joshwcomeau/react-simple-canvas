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
  ));
