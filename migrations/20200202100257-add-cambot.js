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

exports.up = async function(db) {
  await db.dropTable('logs')
  await db.createTable('cambot', {
    log_name: 'string',
    channel_id: 'string',
    start_message_id: 'string',
    end_message_id: 'string'
  })
};

exports.down = async function(db) {
  await db.dropTable('cambot')
};

exports._meta = {
  "version": 1
};
