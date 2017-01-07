/* eslint-disable react/prop-types */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import Line from '../Line';
import { MockContext } from '../../helpers/test.helpers';

const { describe, it } = global;

let consoleErrorSpy = spy(console, 'error');
const mockContext = new MockContext();

describe('Line', () => {
  beforeEach(() => {
    consoleErrorSpy.reset();
  });
  after(() => {
    consoleErrorSpy.restore();
  });

  it('complains when no coordinates are given', () => {
    const wrapper = shallow(<Line />);

    expect(consoleErrorSpy.callCount).to.equal(1);
  });

  it('complains when a single coordinate is missing', () => {
    const wrapper = shallow(<Line x1={0} y1={10} x2={20} />);

    expect(consoleErrorSpy.callCount).to.equal(1);
  });

  it('renders without incident', () => {
    const wrapper = shallow(
      <Line x1={0} y1={0} x2={10} y2={20} />,
      { context: { ctx: mockContext } }
    );

    expect(wrapper).to.be.ok;
  });
});
