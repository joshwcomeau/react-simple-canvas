// @flow
/* eslint-disable react/prop-types */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';

import Line from '../Line';
import { MockContext } from '../../helpers/test.helpers';

const { describe, it } = global;

let consoleErrorStub;

describe('Line', () => {
  before(() => {
    consoleErrorStub = stub(console, 'error');
  });
  beforeEach(() => {
    consoleErrorStub.reset();
  });
  after(() => {
    consoleErrorStub.restore();
  });

  it('complains when no coordinates are given', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(<Line />, { context: { ctx: mockContext } });

    expect(consoleErrorStub.callCount).to.equal(1);
  });

  it('complains when a single coordinate is missing', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(<Line x1={0} y1={10} x2={20} />, {
      context: { ctx: mockContext },
    });

    expect(consoleErrorStub.callCount).to.equal(1);
  });

  it('renders without incident', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(<Line x1={0} y1={0} x2={10} y2={20} />, {
      context: { ctx: mockContext },
    });

    expect(wrapper).to.be.ok;
  });

  it('increments moveTo and lineTo by 0.5px, to satisfy weird Canvas API', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(<Line x1={0} y1={0} x2={10} y2={20} />, {
      context: { ctx: mockContext },
    });

    const expectedMoveToArgs = [0.5, 0.5];
    const expectedLineToArgs = [10.5, 20.5];

    const actualMoveToArgs = mockContext.moveTo.firstCall.args;
    const actualLineToArgs = mockContext.lineTo.firstCall.args;

    expect(actualMoveToArgs).to.deep.equal(expectedMoveToArgs);
    expect(actualLineToArgs).to.deep.equal(expectedLineToArgs);
  });
});
