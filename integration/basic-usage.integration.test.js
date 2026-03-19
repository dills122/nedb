var Datastore = require('../index');
var assert = require('chai').assert;
var fs = require('fs');
var os = require('os');
var path = require('path');

function createDb(filename) {
  var db = new Datastore({ filename: filename });
  return loadDatabase(db).then(function () { return db; });
}

function loadDatabase(db) {
  return new Promise(function (resolve, reject) {
    db.loadDatabase(function (err) {
      if (err) { return reject(err); }
      resolve();
    });
  });
}

function insert(db, doc) {
  return new Promise(function (resolve, reject) {
    db.insert(doc, function (err, newDoc) {
      if (err) { return reject(err); }
      resolve(newDoc);
    });
  });
}

function findOne(db, query) {
  return new Promise(function (resolve, reject) {
    db.findOne(query, function (err, doc) {
      if (err) { return reject(err); }
      resolve(doc);
    });
  });
}

function update(db, query, updateQuery) {
  return new Promise(function (resolve, reject) {
    db.update(query, updateQuery, {}, function (err, numAffected) {
      if (err) { return reject(err); }
      resolve(numAffected);
    });
  });
}

function remove(db, query) {
  return new Promise(function (resolve, reject) {
    db.remove(query, {}, function (err, numRemoved) {
      if (err) { return reject(err); }
      resolve(numRemoved);
    });
  });
}

describe('Integration - Basic Usage', function () {
  var tempDir;
  var dbFile;

  beforeEach(function () {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nedb-integration-'));
    dbFile = path.join(tempDir, 'basic.db');
  });

  afterEach(function () {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('supports basic insert/find/update/remove and persistence reload', function () {
    var firstDb;
    var secondDb;

    return createDb(dbFile)
      .then(function (db) {
        firstDb = db;
        return insert(firstDb, { email: 'ada@example.com', role: 'engineer' });
      })
      .then(function (created) {
        assert.isString(created._id);
        return findOne(firstDb, { email: 'ada@example.com' });
      })
      .then(function (doc) {
        assert.equal(doc.role, 'engineer');
        return update(firstDb, { email: 'ada@example.com' }, { $set: { role: 'staff' } });
      })
      .then(function (numAffected) {
        assert.equal(numAffected, 1);
        return findOne(firstDb, { email: 'ada@example.com' });
      })
      .then(function (doc) {
        assert.equal(doc.role, 'staff');
        return insert(firstDb, { email: 'grace@example.com', role: 'scientist' });
      })
      .then(function () {
        return remove(firstDb, { email: 'ada@example.com' });
      })
      .then(function (numRemoved) {
        assert.equal(numRemoved, 1);
        return findOne(firstDb, { email: 'ada@example.com' });
      })
      .then(function (doc) {
        assert.isNull(doc);
        return createDb(dbFile);
      })
      .then(function (db) {
        secondDb = db;
        return findOne(secondDb, { email: 'grace@example.com' });
      })
      .then(function (persistedDoc) {
        assert.isObject(persistedDoc);
        assert.equal(persistedDoc.role, 'scientist');
      });
  });
});
