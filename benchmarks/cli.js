var Command = require('commander').Command;


module.exports.parseOptions = function (argv) {
  return new Command()
    .option('-n --number [number]', 'Size of the collection to test on', parseInt)
    .option('-i --with-index', 'Use an index')
    .option('-m --in-memory', 'Test with an in-memory only store')
    .parse(argv || process.argv)
    .opts();
};
