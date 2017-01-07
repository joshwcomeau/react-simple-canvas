export const pick = (object, keys) => {
  if (!Array.isArray(keys)) {
    // eslint-disable-next-line no-param-reassign
    keys = Object.keys(keys);
  }

  return keys.reduce((result, key) => {
    if (typeof object[key] === 'undefined') {
      return result;
    }

    return {
      ...result,
      [key]: object[key],
    };
  }, {});
};

export const omit = (object, rejectedKeys) => {
  if (!Array.isArray(rejectedKeys)) {
    // eslint-disable-next-line no-param-reassign
    rejectedKeys = Object.keys(rejectedKeys);
  }

  const desiredKeys = Object.keys(object).filter(key => (
    !rejectedKeys.includes(key)
  ));

  return pick(object, desiredKeys);
};

export const anyUndefined = (...args) => (
  args.some(arg => typeof arg === 'undefined')
);
