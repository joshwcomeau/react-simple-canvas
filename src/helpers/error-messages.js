import { MODULE_NAME } from '../constants';

export const invalidInputForGettingDashArrayA = (input, parentComponent) => `
>> Error, via ${MODULE_NAME} <<

You attempted to use a dash array, but provided an invalid input: ${input}.

Please provide a number, a string, or an array of numbers or strings.

Check the render method of ${parentComponent.constructor.displayName}.
`;

export const missingCoordinates = (coordinates, parentComponent) => `
>> Error, via ${MODULE_NAME} <<

You created a ${parentComponent.constructor.displayName}, but did not provide all required coordinates.

You provided: ${JSON.stringify(coordinates, null, 2)}.

Check the render method of ${parentComponent.constructor.displayName}.
`;
