/* eslint-disable react/prop-types */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import Svg from '../Svg';
import Line from '../Line';
import { MockContext } from '../../helpers/test.helpers';

const { describe, it } = global;


describe('Svg', () => {
  it('renders without incident', () => {
    const wrapper = shallow(<Svg />);

    expect(wrapper).to.be.ok;
  });

  it('clears the canvas in the render', () => {
    const mockContext = new MockContext();
    mount(<Svg width={100} height={100} mockContext={mockContext} />);

    expect(mockContext.clearRect.callCount).to.equal(1);
    expect(mockContext.clearRect.firstCall.args).to.deep.equal([0, 0, 100, 100]);
  });

  it('computes delegated props for <canvas>', () => {
    const mockContext = new MockContext();

    const getDelegatedPropsSpy = spy(Svg.prototype, 'getDelegatedProps');

    mount(<Svg mockContext={mockContext} className="myCanvas" />);

    // It gets called twice, because of the double-render on mount to get the ref
    expect(getDelegatedPropsSpy.callCount).to.equal(2);

    expect(
      getDelegatedPropsSpy.firstCall.returned({ className: 'myCanvas' })
    ).to.equal(true);
  });

  it('passes HTML context through React context', () => {
    const mockContext = new MockContext();

    const wrapper = mount(
      <Svg mockContext={mockContext}>
        <Line
          x1={0}
          y1={0}
          x2={10}
          y2={10}
        />
      </Svg>
    );

    const actualContext = wrapper.find(Line).nodes[0].context;
    const expectedContext = { ctx: mockContext };

    expect(actualContext).to.deep.equal(expectedContext);
  });
});
