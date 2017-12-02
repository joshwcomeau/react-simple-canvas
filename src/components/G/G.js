// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  children: any,
};

// TODO: Make the G actually useful. Right now it just serves to group
// elements semantically, and to allow stories to be written with decorators.
// ALSO TODO: The wrapper isn't needed in React 16, but React CDK doesn't
// support React 16. If i'm serious about this project I should move all the
// code to a new build system (NWB?)
const G = ({ children }: Props) => <div>{children}</div>;

G.contextTypes = {
  ctx: PropTypes.object,
};

export default G;
