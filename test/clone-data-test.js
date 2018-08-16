const path = require('path');
require('should');
const lib = require(path.join('..', 'lib', 'clone-data.js'));

describe('#clone (object)', function () {
  it('no changes', function () {
    lib.clone({ some: 'data', otherObject: { with: 'properties' } }).should.deepEqual({ some: 'data', otherObject: { with: 'properties' } });
  });
  it('no changes', function () {
    lib.clone({ some: 'data', otherObject: { $ne: true } }).should.deepEqual({ some: 'data', otherObject: { '[$]ne': true } });
    lib.clone({ some: 'data', otherObject: { $eq: true } }).should.deepEqual({ some: 'data', otherObject: { '[$]eq': true } });
    lib.clone({ some: 'data', otherObject: { '$ne': true } }).should.deepEqual({ some: 'data', otherObject: { '[$]ne': true } });
    lib.clone({ some: 'data', otherObject: { '$eq': true } }).should.deepEqual({ some: 'data', otherObject: { '[$]eq': true } });
    lib.clone({ some: 'data', otherObject: { '.': true } }).should.deepEqual({ some: 'data', otherObject: { '[dot]': true } });
  });
});

describe('#encode (object)', function () {
  it('random samples', function () {
    lib.encode('$ne').should.deepEqual('[$]ne');
    lib.encode('.').should.deepEqual('[dot]');
  });
});

describe('#decode (object)', function () {
  it('random samples', function () {
    lib.decode('[$]ne').should.deepEqual('$ne');
    lib.decode('[$]gt').should.deepEqual('$gt');
    lib.decode('[$]gte').should.deepEqual('$gte');
    lib.decode('[$]lt').should.deepEqual('$lt');
    lib.decode('[$]lt').should.deepEqual('$lt');
    lib.decode('[$]lte').should.deepEqual('$lte');
    lib.decode('[dot]').should.deepEqual('.');
  });
});
