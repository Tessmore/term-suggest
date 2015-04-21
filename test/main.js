'use strict';

var assert = require('assert');
var suggester = require('../main.js');

describe('Suggestions', function() {
  it('Works with no input', function() {
    var res = suggester.closest();
    assert.equal(res, null);
  });

  it('Works with empty terms', function() {
    var res = suggester.closest("hello");
    assert.equal(res, null);

    var res = suggester.closest("hello", []);
    assert.equal(res, null);
  });

  it('Works with single term', function() {
    var res = suggester.closest("hello", ["help"]);
    assert.equal(res, "help");
  });

  it('Works with multiple terms', function() {
    var res = suggester.closest("hello", ["world", "hello"]);
    assert.equal(res, "hello");
  });

  it('Variable number of results', function() {
    var res = suggester.closest("hello", ["world", "hello"], 2);
    assert.equal(res.length, 2);
  });

  it('Test', function() {
    var res = suggester.closest("stauts", ["clone", "pull", "push", "commit", "status", "help"]);
    assert.equal(res, "status");
  });
});