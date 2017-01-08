import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { createSvgDecorator } from '../../helpers/stories.helpers';
import Rect from '../Rect';


storiesOf('Rect', module)
  .addDecorator(createSvgDecorator())
  .add('default', () => (
    <Rect x={20} y={20} width={100} height={100} />
  ))
  .add('custom fill', () => (
    <Rect x={20} y={20} width={100} height={100} fill="#F00" />
  ))
  .add('custom stroke', () => (
    <Rect x={20} y={20} width={100} height={100} stroke="#F00" />
  ))
  .add('custom fill and stroke', () => (
    <Rect x={20} y={20} width={100} height={100} fill="#CCC" stroke="#333"/>
  ))
