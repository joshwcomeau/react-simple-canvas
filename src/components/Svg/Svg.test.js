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

  it('invokes `cloneChildrenWithCtx` with the children', () => {
    const mockContext = new MockContext();

    const svgSpy = spy(Svg.prototype, 'cloneChildrenWithCtx');
    const child = <div />;

    mount(
      <Svg mockContext={mockContext}>
        {child}
      </Svg>
    );

    expect(svgSpy.callCount).to.equal(1);
    expect(svgSpy.firstCall.args).to.deep.equal([child]);
  });

  it('invokes a half-pixel translation', () => {
    const mockContext = new MockContext();
    mount(<Svg mockContext={mockContext} />);

    expect(mockContext.translate.callCount).to.equal(1);
    expect(mockContext.translate.firstCall.args).to.deep.equal([0.5, 0.5]);
  });

  it('clears the canvas in the render', () => {
    const mockContext = new MockContext();
    mount(<Svg width={100} height={100} mockContext={mockContext} />);

    expect(mockContext.clearRect.callCount).to.equal(1);
    expect(mockContext.clearRect.firstCall.args).to.deep.equal([0, 0, 100, 100]);
  });

  describe('passing HTML context to children', () => {
    it('passes context to direct child', () => {
      const mockContext = new MockContext();

      const wrapper = mount(
        <Svg mockContext={mockContext}>
          <Line
            x1={0}
            y1={0}
            x2={10}
            y2={10}
            stroke="black"
            strokeDashoffset={0}
            strokeLinecap="butt"
            strokeWidth={1}
          />
        </Svg>
      );

      const actualProps = Object.keys(wrapper.find(Line).nodes[0].props);
      const expectedProps = ['x1', 'y1', 'x2', 'y2', 'stroke', 'strokeDashoffset', 'strokeLinecap', 'strokeWidth', 'ctx'];

      expect(actualProps).to.deep.equal(expectedProps);
    });

    it('passes context to grandchildren', () => {
      const mockContext = new MockContext();

      const Child = ({ children }) => <div>{children}</div>;
      const Grandchild = () => <div>Grandchild</div>;

      const wrapper = mount(
        <Svg mockContext={mockContext}>
          <Child randomProp={5}>
            <Grandchild grandProp={10} />
          </Child>
        </Svg>
      );

      const renderedNode = wrapper.find(Grandchild);
      const actualProps = Object.keys(renderedNode.nodes[0].props);
      const expectedProps = ['grandProp', 'ctx'];

      expect(actualProps).to.deep.equal(expectedProps);
    });
  });
});
