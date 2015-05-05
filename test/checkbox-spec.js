var Promise = require('bluebird');
var inquirer = require('inquirer');

function all(message, list) {
  return new Promise(function (resolve) {
    var question = {
      type: 'checkbox',
      name: 'all',
      message: message,
      choices: list
    };
    inquirer.prompt([question], function (answers) {
      console.log('user picked options', answers.all);
      resolve(answers.all);
    });
  });
}

var bddStdin = require('..');

describe('checkbox from inquirer', function () {

  it('selects the first only - nogit', function () {
    bddStdin(bddStdin.keys.space, bddStdin.keys.enter);

    return all('pick option one', ['one', 'two'])
      .then(function (response) {
        console.assert(Array.isArray(response) &&
          response.length === 1 &&
          response[0] === 'one',
          'received wrong choices ' + response);
      });
  });

  it('selects first and third - nogit', function () {
    bddStdin(' ', bddStdin.keys.down, ' ', '\n');

    return all('pick options one and three', ['one', 'two', 'three'])
      .then(function (response) {
        console.assert(Array.isArray(response) &&
          response.length === 2 &&
          response[0] === 'one',
          response[1] === 'three',
          'received wrong choices ' + response);
      });
  });

});
