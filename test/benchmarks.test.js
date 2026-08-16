var assert = require('chai').assert
  , parseOptions = require('../benchmarks/cli').parseOptions
  ;


describe('Benchmark command line', function () {
  it('Parses the benchmark options with modern Commander', function () {
    var options = parseOptions([
      'node'
    , 'benchmark'
    , '--number'
    , '25'
    , '--with-index'
    , '--in-memory'
    ]);

    assert.strictEqual(options.number, 25);
    assert.strictEqual(options.withIndex, true);
    assert.strictEqual(options.inMemory, true);
  });
});
