// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
/* eslint-enable */

import Rect from '../Rect';
import { MockContext } from '../../helpers/test.helpers';

const { describe, it } = global;

let consoleErrorStub;

describe('Rect', () => {
  before(() => {
    consoleErrorStub = stub(console, 'error');
  });
  beforeEach(() => {
    consoleErrorStub.reset();
  });
  after(() => {
    consoleErrorStub.restore();
  });

  it('renders without incident', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(<Rect />, { context: { ctx: mockContext } });

    expect(wrapper).to.be.ok;
  });

  it('invokes ctx.rect with the right props', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(<Rect x={25} y={50} width={100} height={200} />, {
      context: { ctx: mockContext },
    });

    const expectedRectArgs = [25, 50, 100, 200];
    const actualRectArgs = mockContext.rect.firstCall.args;

    expect(actualRectArgs).to.deep.equal(expectedRectArgs);
  });

  it('fills, but does not stroke, by default', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(<Rect x={25} y={50} width={100} height={200} />, {
      context: { ctx: mockContext },
    });

    expect(mockContext.fill.callCount).to.equal(1);
    expect(mockContext.stroke.callCount).to.equal(0);
  });

  it('can be stroked by passing a colour value', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(
      <Rect x={25} y={50} width={100} height={200} stroke="#F00" />,
      { context: { ctx: mockContext } },
    );

    expect(mockContext.stroke.callCount).to.equal(1);

    // Check that it actually strokes the right colour
    expect(mockContext.strokeStyle).to.equal('#F00');

    // Check that it's still filling by default
    expect(mockContext.fill.callCount).to.equal(1);
  });

  it('can be custom filled by providing a colour value', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(
      <Rect x={25} y={50} width={100} height={200} fill="#F00" />,
      { context: { ctx: mockContext } },
    );

    expect(mockContext.fill.callCount).to.equal(1);
    expect(mockContext.fillStyle).to.equal('#F00');
  });

  it('can remove fill by passing `null`', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(
      <Rect x={25} y={50} width={100} height={200} fill={null} />,
      { context: { ctx: mockContext } },
    );

    expect(mockContext.fill.callCount).to.equal(0);

    // Check that it's still not stroking by default
    expect(mockContext.stroke.callCount).to.equal(0);
  });

  it('can remove fill by passing "none"', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(
      <Rect x={25} y={50} width={100} height={200} fill="none" />,
      { context: { ctx: mockContext } },
    );

    expect(mockContext.fill.callCount).to.equal(0);
  });

  it('will not stroke by passing "none"', () => {
    const mockContext = new MockContext();

    const wrapper = shallow(
      <Rect x={25} y={50} width={100} height={200} stroke="none" />,
      { context: { ctx: mockContext } },
    );

    expect(mockContext.stroke.callCount).to.equal(0);
  });
});
