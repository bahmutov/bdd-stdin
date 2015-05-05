var Promise = require('bluebird');
var inquirer = require('inquirer');

function choice(message, list) {
  return new Promise(function (resolve) {
    var question = {
      type: 'list',
      name: 'choice',
      message: message,
      choices: list
    };
    inquirer.prompt([question], function (answers) {
      console.log('user picked', answers.choice);
      resolve(answers.choice.trim());
    });
  });
}

var bddStdin = require('..');

describe('choice from inquirer', function () {

  it('selects the default choice', function () {
    bddStdin('\n');

    return choice('pick one', ['one', 'two'])
      .then(function (response) {
        console.assert(response === 'one', 'received response ' + response);
      });
  });

  it('selects the second choice - nogit', function () {
    bddStdin(bddStdin.keys.down, '\n');

    return choice('pick two', ['one', 'two'])
      .then(function (response) {
        console.assert(response === 'two', 'received response ' + response);
      });
  });

  it('selects the third choice - nogit', function () {
    bddStdin(bddStdin.keys.down, bddStdin.keys.down, '\n');
    return choice('pick three', ['one', 'two', 'three'])
      .then(function (response) {
        console.assert(response === 'three', 'received response ' + response);
      });
  });

});
