import { MODULE_NAME } from '../constants';

export const invalidInputForGettingDashArray = (input, parentComponent) => `
>> Error, via ${MODULE_NAME} <<

You attempted to use a dash array, but provided an invalid input: ${input}.

Please provide a number, a string, or an array of numbers or strings.

Check the render method of ${parentComponent}.
`;
