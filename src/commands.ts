import { Client, Message } from 'discord.js';
import { Pool } from 'pg';

export async function handleCommand(db: Pool, client: Client, msg: Message) {
  return false;
}
