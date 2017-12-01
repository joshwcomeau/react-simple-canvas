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

export function applyStroke(
  ctx,
  {
    stroke,
    strokeDasharray,
    strokeDashoffset,
    strokeLinecap,
    strokeOpacity,
    strokeWidth,
  }
) {
  if (strokeDasharray) {
    const dashArray = getDashArray(strokeDasharray, this);
    ctx.setLineDash(dashArray);
    ctx.lineDashOffset = strokeDashoffset;
  }

  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = stroke;
  ctx.lineCap = strokeLinecap;

  if (typeof strokeOpacity !== 'undefined') {
    ctx.globalAlpha = strokeOpacity;
  }

  ctx.stroke();
}
