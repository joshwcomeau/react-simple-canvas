import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Svg from './Svg';

const { describe, it } = global;

describe('Svg', () => {
  it('renders without incident', () => {
    const wrapper = shallow(<Svg />);

    expect(wrapper).to.be.ok;
  });
});
