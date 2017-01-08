/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
/* eslint-enable */

import G from '../G';
import { MockContext } from '../../helpers/test.helpers';

const { describe, it } = global;

let consoleErrorStub = stub(console, 'error');
const mockContext = new MockContext();

describe('G', () => {
  beforeEach(() => {
    consoleErrorStub.reset();
  });
  after(() => {
    consoleErrorStub.restore();
  });

  it('renders without incident', () => {
    const wrapper = shallow(
      <G />,
      { context: { ctx> mockContext } }
    );

    expect(wrapper).to.be.ok;
  });
