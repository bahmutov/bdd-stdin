var Promise = require('bluebird');
var bddStdin = require('..');
require = require('really-need');

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

describe('mock prompt', function () {

  var question = {
    type: 'checkbox',
    name: 'all',
    message: 'pick options',
    choices: ['one', 'two', 'three']
  };

  var inquirer;

  beforeEach(function () {
    inquirer = require('inquirer', {
      bust: true,
      post: function (inq) {
        var _prompt = inq.prompt.bind(inq);
        inq.prompt = function (questions, cb) {
          if (questions.length === 1 &&
            questions[0].name === 'all') {
            setTimeout(function () {
              cb({
                all: ['one']
              });
            }, 0);
          }
          setTimeout(function () {
            _prompt(question, cb);
          }, 0);
        };
        return inq;
      }
    });
  });


  it('select first choice', function (done) {
    inquirer.prompt([question], function (answers) {
      var response = answers.all;
      console.assert(Array.isArray(response) &&
        response.length === 1 &&
        response[0] === 'one',
        'received wrong choices ' + response);
      done();
    });
  });

});
