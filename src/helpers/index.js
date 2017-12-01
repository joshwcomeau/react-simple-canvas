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

export function resetCtx(ctx) {
  /* eslint-disable no-param-reassign */
  ctx.globalAlpha = 1;
  /* eslint-enable */
}
