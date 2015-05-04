var ask = require('./ask');
var bddStdin = require('..');

describe('ask', function () {

  it('asks one question', function () {
    bddStdin('response');

    return ask('question: test')
      .then(function (response) {
        console.assert(response === 'response', 'received response ' + response);
      });
  });

  it('asks two questions', function () {
    bddStdin('one', 'two');

    return ask('first question')
      .then(function (response) {
        console.assert(response === 'one', 'received response ' + response);
        console.log('first answer');
        return ask('second question');
      })
      .then(function (response) {
        console.assert(response === 'two', 'received response ' + response);
      });
  });

  it('asks three questions', function () {
    bddStdin('one', 'two', 'three');

    return ask('question 1')
      .then(function (response) {
        console.assert(response === 'one', 'received response ' + response);
        return ask('question 2');
      })
      .then(function (response) {
        console.assert(response === 'two', 'received response ' + response);
        return ask('question 3');
      }).then(function (response) {
        console.assert(response === 'three', 'received response ' + response);
      });
  });

  it('asks three questions separately', function () {

    bddStdin('one');
    return ask('question 1')
      .then(function (response) {
        console.assert(response === 'one', 'received response ' + response);
        bddStdin('two');
        return ask('question 2');
      })
      .then(function (response) {
        console.assert(response === 'two', 'received response ' + response);

        bddStdin('three');
        return ask('question 3');
      }).then(function (response) {
        console.assert(response === 'three', 'received response ' + response);
      });
  });

});
