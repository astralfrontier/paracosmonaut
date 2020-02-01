'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('logs', {
    created_on: 'timestamp',
    author: 'string',
    message: 'text'
  })
};

exports.down = function(db) {
  db.dropTable('logs')
};

exports._meta = {
  "version": 1
};
