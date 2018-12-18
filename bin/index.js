#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const colors = require('colors');
const yubify = require('../lib/yubify');
const clipboardy = require('clipboardy');

program
  .version('1.0.0')
  .description('Encode a message in a yubikey')
  .usage('<toEncode> [options]');

program
  .option('-r, --no-reverse', 'Do not reverse the input')
  .option('-n, --number <numOptions>', 'Number of options to choose from', 100)
  .parse(process.argv);
  
if (program.args.length == 0) {
  console.log('Error: A string to convert is required');
  process.exit();
}

var toEncode = program.args.join(" ");

var encodedStrs = yubify(toEncode, program.reverse, program.number);

const questions = [
  { type: 'list', name:'encoded', message: 'Selection', choices: encodedStrs }
];

inquirer
  .prompt(questions)
  .then(answers => {
    clipboardy.writeSync(answers.encoded);
  });