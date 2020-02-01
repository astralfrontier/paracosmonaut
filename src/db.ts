import { Client, Pool } from 'pg';
import { Message } from 'discord.js';

import { messageNick } from './utils';

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

/**
 * Write a Discord message to our database
 * @param msg
 */
export async function logMessage(db: Client | Pool, msg: Message) {
  const created_on = new Date(msg.createdTimestamp).toISOString();
  const author = messageNick(msg);
  const message = msg.content;
  await db.query('INSERT INTO logs (created_on, author, message) VALUES($1, $2, $3)', [
    created_on,
    author,
    message,
  ]);
}

export default db;
