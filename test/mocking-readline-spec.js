require = require('really-need');
// seems to interfere with other tests
describe.skip('mock readline', function () {

  var inquirer;

  mockRl = {
    pause: function () {},
    resume: function () {},
    close: function () {},
    on: function () {},
    removeListener: function () {},
    output: {
      mute: function () {},
      unmute: function () {},
      end: function () {},
      write: function () {}
    },
    addEventListener: function (name, handler) {
      if (!mockRl._listeners[name]) {
        mockRl._listeners[name] = [];
      }
      mockRl._listeners[name].push(handler);
    },
    removeEventListener: function () {},
    setPrompt: function () {},
    _listeners: {}
  };

  beforeEach(function () {
    console.log(Object.keys(require.cache).join('\n'));
    require('inquirer/node_modules/readline2', {
      bust: true,
      keep: true,
      post: function (rl2) {
        rl2.createInterface = function () {
          return mockRl;
        };
        return rl2;
      }
    });
    inquirer = require('inquirer', {
      bust: true
    });
  });

  function emitSpace() {
    setTimeout(function () {
      if (mockRl._listeners.keypress) {
        mockRl._listeners.keypress.forEach(function (handler) {
          handler(undefined, { name: 'space' });
        });
      }
    }, 0);
  }

  function emitNewLine() {
    setTimeout(function () {
      if (mockRl._listeners.line) {
        mockRl._listeners.line.forEach(function (handler) {
          handler();
        });
      }
    }, 0);
  }

  it('select first choice', function (done) {
    emitSpace();
    emitNewLine();

    var question = {
      type: 'checkbox',
      name: 'all',
      message: 'pick options',
      choices: ['one', 'two', 'three']
    };

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
