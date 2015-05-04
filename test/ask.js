var Promise = require('bluebird');

function ask(question) {
  console.log(question);

  return new Promise(function (resolve) {
    process.stdin.once('data', function (data) {
      resolve(data.toString().trim());
    });
  });
}

module.exports = ask;
