import { assert } from 'chai';

describe('test', () => {
  it('should be true', () => {
    assert.equal(3, '3', '== coerces values to strings');
  });
});
