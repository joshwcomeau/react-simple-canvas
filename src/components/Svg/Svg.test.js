import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Svg from '../Svg';

const { describe, it } = global;

describe('Svg', () => {
  it('renders without incident', () => {
    const wrapper = shallow(<Svg />);
    console.log(window);
    expect(wrapper).to.be.ok();
  });
});
