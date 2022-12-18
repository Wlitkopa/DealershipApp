
import assert from 'assert';
import { KeyObject } from 'crypto';
import { check_file } from '../zadanie2.js';

describe('The check_file function()', function () {
  it('Returns "/home/przemek is a directory', function () {
    let path = '/home/przemek';
    assert.strictEqual(check_file(path), path + ' is a directory')
  });
  it('Returns "kot"', function () {
    let path = '/home/przemek/kot.txt';
    assert.strictEqual(check_file(path), 'kot\n')
  });
  it('Returns "Nie ma takiego pliku lub katalogu"', function () {
    let path = '/home/przemekbjhbj';
    assert.strictEqual(check_file(path), 'Nie ma takiego pliku lub katalogu')
  });
});