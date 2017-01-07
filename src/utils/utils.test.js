import { expect } from 'chai';

import { pick, omit, anyUndefined } from './index';

const { describe, it } = global;

describe('utils', () => {
  describe('pick', () => {
    it('picks a single value', () => {
      const object = { a: 5, b: 10 };
      const keys = ['a'];

      const expectedOutput = { a: 5 };
      const actualOutput = pick(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('picks several values', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['b', 'd'];

      const expectedOutput = { b: 10, d: 20 };
      const actualOutput = pick(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it("ignores keys that don't exist", () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['b', 'e'];

      const expectedOutput = { b: 10 };
      const actualOutput = pick(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('returns an empty object when ONLY nonexistent keys are provided', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['e'];

      const expectedOutput = {};
      const actualOutput = pick(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('returns an empty object when no keys are provided', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = [];

      const expectedOutput = {};
      const actualOutput = pick(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('ignores duplicate keys', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['b', 'b', 'b'];

      const expectedOutput = { b: 10 };
      const actualOutput = pick(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('is not order-sensitive', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['d', 'a', 'c', 'b'];

      const expectedOutput = { a: 5, b: 10, c: 15, d: 20 };
      const actualOutput = pick(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('auto-plucks keys if an object is provided', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = { a: 5, c: 15 };

      const expectedOutput = { a: 5, c: 15 };
      const actualOutput = pick(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });
  });

  describe('omit', () => {
    it('filters out a single value', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['a'];

      const expectedOutput = { b: 10, c: 15, d: 20 };
      const actualOutput = omit(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('filters out multiple value', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['c', 'a'];

      const expectedOutput = { b: 10, d: 20 };
      const actualOutput = omit(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('ignores keys that do not exist', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['c', 'e'];

      const expectedOutput = { a: 5, b: 10, d: 20 };
      const actualOutput = omit(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('returns the full match when no keys exist on the object', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = ['e'];

      const expectedOutput = { a: 5, b: 10, c: 15, d: 20 };
      const actualOutput = omit(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('returns the full match when no keys are provided', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = [];

      const expectedOutput = { a: 5, b: 10, c: 15, d: 20 };
      const actualOutput = omit(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });

    it('auto-plucks keys if an object is provided', () => {
      const object = { a: 5, b: 10, c: 15, d: 20 };
      const keys = { a: 5, c: 15 };

      const expectedOutput = { b: 10, d: 20 };
      const actualOutput = omit(object, keys);

      expect(actualOutput).to.deep.equal(expectedOutput);
    });
  });

  describe('anyUndefined', () => {
    it('returns false for a single defined value', () => {
      const actualOutput = anyUndefined(true);
      const expectedOutput = false;

      expect(actualOutput).to.equal(expectedOutput);
    });

    it('returns false for a null value', () => {
      const actualOutput = anyUndefined(null);
      const expectedOutput = false;

      expect(actualOutput).to.equal(expectedOutput);
    });

    it('returns true for a single undefined value', () => {
      const actualOutput = anyUndefined(undefined);
      const expectedOutput = true;

      expect(actualOutput).to.equal(expectedOutput);
    });

    it('returns true for one of several undefined', () => {
      const actualOutput = anyUndefined(true, undefined, 8);
      const expectedOutput = true;

      expect(actualOutput).to.equal(expectedOutput);
    });
  });
});
