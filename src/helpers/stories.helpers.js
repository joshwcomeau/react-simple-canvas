import React from 'react';

import Svg from '../components/Svg';


export const createSvgDecorator = props => (story) => {
  const defaultProps= {
    width: 250,
    height: 250,
    style: {
      border: '1px solid #888',
    },
  };

  return (
    <Svg {...defaultProps} {...props}>
      {story()}
    </Svg>
  );
};
