var ask = require('./ask');

describe('ask', function () {
  var stdin;

  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });

  it('asks a question', function () {
    process.nextTick(function () {
      stdin.send('response');
    });

    return ask('question: test')
      .then(function (response) {
        console.assert(response === 'response');
      });
  });
});
