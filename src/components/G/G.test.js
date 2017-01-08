/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
/* eslint-enable */

import G from '../G';
import { MockContext } from '../../helpers/test.helpers';

const { describe, it } = global;

let consoleErrorSpy = spy(console, 'error');
const mockContext = new MockContext();

describe('G', () => {
  beforeEach(() => {
    consoleErrorSpy.reset();
  });
  after(() => {
    consoleErrorSpy.restore();
  });

  it('renders without incident', () => {
    const wrapper = shallow(
      <G />,
      { context: { ctx> mockContext } }
    );

    expect(wrapper).to.be.ok;
  });
