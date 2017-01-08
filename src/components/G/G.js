import React, { Component, PropTypes } from 'react';


// TODO: Make the G actually useful. Right now it just serves to group
// elements semantically, and to allow stories to be written with decorators.
// Also, I want to see if it can be done without adding illegal markup within
// a Canvas.
const G = ({ children }) => (
  <div>
    {children}
  </div>
);


G.displayName = 'G'

G.propTypes = {

};

G.contextTypes = {
  ctx: PropTypes.object,
};

G.defaultProps = {

};

export default G;
