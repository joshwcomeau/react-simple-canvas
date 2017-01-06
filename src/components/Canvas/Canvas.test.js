import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Canvas from '../Canvas';

const { describe, it } = global;

describe('Canvas', () => {
  it('renders without incident', () => {
    const wrapper = shallow(<Canvas />);
    console.log(wrapper);
    expect(wrapper).to.be.ok();
  });
});
