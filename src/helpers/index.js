import {
  invalidInputForGettingDashArray,
} from './error-messages';

// Figure out our backing scale.
// This ensures canvas looks crisp on retina displays, where there are
// in fact 4 on-screen pixels for every 1 calculated pixel.
export function scaleCanvas(canvas, ctx) {
  // If we're rendering on the server, do nothing.
  if (typeof window === 'undefined') {
    return;
  }

  const backingStoreRatio = (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  );

  // eslint-disable-next-line no-undef
  const ratio = (window.devicePixelRatio || 1) / backingStoreRatio;

  if (ratio > 1) {
    /* eslint-disable no-param-reassign */
    canvas.style.height = `${canvas.height}px`;
    canvas.style.width = `${canvas.width}px`;
    canvas.width *= ratio;
    canvas.height *= ratio;
    /* eslint-enable */

    ctx.scale(ratio, ratio);
  }
}

export function getDashArray(input, parentComponent) {
  // Input can be a number (5), a string ('5, 10'), or an array (['5', '10']).
  // We want to convert it to an array of numbers, since that's what canvas
  // actually accepts.

  switch (typeof input) {
    case 'number': return [input];
    case 'string': {
      return input
        .replace(/\s/g, '')   // remove whitespace
        .split(',')           // convert to array
        .map(Number);          // convert each item in the array to a Number.
    }
    default:
      // If we've made it this far, it's either an array, or something crazy
      // like an object or function.
      if (!Array.isArray(input)) {
        throw new Error(invalidInputForGettingDashArray(input, parentComponent));
      }

      // Ensure every array item is a Number
      return input.map(Number);
  }
}
