# bdd-stdin

> Utility for easily mocking user responses for BDD unit tests that ask user a question.

[![NPM][bdd-stdin-icon]][bdd-stdin-url]

[![Build status][ci-image]][ci-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devdependencies][bdd-stdin-devdependencies-image] ][bdd-stdin-devdependencies-url]

I needed something to help [unit testing CLI apps](http://glebbahmutov.com/blog/unit-testing-cli-programs/).

`npm install bdd-stdin --save-save`

## typing text

```js
var ask = require('./ask');
// ask is promise-returning stdin question
var bddStdin = require('bdd-stdin');
describe('ask', function () {
  it('asks one question', function () {
    bddStdin('answer');
    return ask('type "answer"')
      .then(function (response) {
        console.assert(response === 'answer');
      });
  });
});
```

You can provide multiple answers to be delivered in turns

```js
var ask = require('./ask');
var bddStdin = require('bdd-stdin');
describe('ask', function () {
  it('asks one question', function () {
    bddStdin('one', 'two');
    return ask('type "one"')
      .then(function (response) {
        console.assert(response === 'one');
        return ask('type "two"');
      })
      .then(function (response) {
        console.assert(response === 'two');
      });
  });
});
```

You can even provide answers before each question individually

```js
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
```

## selecting choice using up / down keys

If you use a 3rd party library, like [inquirer](https://github.com/SBoudrias/Inquirer.js) you need to select
the right choice using up / down keys. The `bddStdin` object has object property `keys` with `up`, `down`, `left`
and `right` codes. 

For example the follwing code

```js
var inquirer = require('inquirer');
var question = {
  type: 'list',
  name: 'choice',
  message: 'pick three',
  choices: ['one', 'two', 'three']
};
inquirer.prompt([question], function (answers) {
  console.log('user picked', answers.choice);
});
```

presents the user with the following prompt:

    ? pick three: (Use arrow keys)
    ❯ one 
      two 
      three

We can provide mock answer in our unit tests

```js
var bddStdin = require('bdd-stdin');
it('selects the third choice', function (done) {
  bddStdin(bddStdin.keys.down, bddStdin.keys.down, '\n');
  var question = {
    type: 'list',
    name: 'choice',
    message: 'pick three',
    choices: ['one', 'two', 'three']
  };
  inquirer.prompt([question], function (answers) {
    console.assert(response === 'three', 'received response ' + response);
    done();
  });
});
```

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/bdd-stdin/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[bdd-stdin-icon]: https://nodei.co/npm/bdd-stdin.png?downloads=true
[bdd-stdin-url]: https://npmjs.org/package/bdd-stdin

[ci-image]: https://travis-ci.org/bahmutov/bdd-stdin.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/bdd-stdin
[dependencies-image]: https://david-dm.org/bahmutov/bdd-stdin.png
[dependencies-url]: https://david-dm.org/bahmutov/bdd-stdin
[bdd-stdin-devdependencies-image]: https://david-dm.org/bahmutov/bdd-stdin/dev-status.png
[bdd-stdin-devdependencies-url]: https://david-dm.org/bahmutov/bdd-stdin#info=devDependencies

