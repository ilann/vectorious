(function() {
  'use strict';

  var Benchmark = require('benchmark'),
      Vector = require('../vector'),
      nblas = require('nblas'),
      chalk = require('chalk'),
      copy = new Benchmark.Suite(),
      inplace = new Benchmark.Suite();

  var N = 1024,
      a = Vector.random(N),
      b = Vector.random(N);

  console.log('a, b = Vector.random(' + N + ')');
  console.log(chalk.yellow('copy'), chalk.green('in-place'));
  copy
    .add('Vector.zeros(' + N + ')', function() {
      Vector.zeros(N);
    })
    .add('Vector.ones(' + N + ')', function() {
      Vector.ones(N);
    })
    .add('Vector.range(0, ' + N + ')', function() {
      Vector.range(0, N);
    })
    .add('Vector.combine(a, b)', function() {
      Vector.combine(a, b);
    })
    .add('Vector.add(a, b)', function() {
      Vector.add(a, b);
    })
    .add('Vector.subtract(a, b)', function() {
      Vector.subtract(a, b);
    })
    .add('Vector.scale(a, Math.random())', function() {
      Vector.scale(a, Math.random());
    })
    .add('Vector.project(a, b)', function() {
      Vector.project(a, b);
    })
    .on('cycle', function(event) {
      console.log(chalk.yellow(String(event.target)));
    })
    .run();

  inplace
    .add('a.add(b)', function() {
      a.add(b);
    })
    .add('a.subtract(b)', function() {
      a.subtract(b);
    })
    .add('a.scale(Math.random())', function() {
      a.scale(Math.random());
    })
    .add('a.normalize()', function() {
      a.normalize();
    })
    .add('a.dot(b)', function() {
      a.dot(b);
    })
    .add('a.magnitude()', function() {
      a.magnitude();
    })
    .add('a.angle(b)', function() {
      a.angle(b);
    })
    .add('a.project(b)', function() {
      a.project(b);
    })
    .on('cycle', function(event) {
      console.log(chalk.green(String(event.target)));
    })
    .on('complete', function() {
      console.log();
    })
    .run();
}());
