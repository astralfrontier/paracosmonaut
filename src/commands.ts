import { Client, Message } from 'discord.js';
import { Pool } from 'pg';

async function findExistingLog(db: Pool, channel_id: string) {
  const result = await db.query('SELECT * FROM cambot WHERE channel_id = $1', [channel_id])
  return result
}

async function cambotStart(db: Pool, msg: Message, logName: string) {
  if (msg.channel.type != 'text') {
    await msg.reply('Cambot only works in text channels')
    return
  }
  const channel_id = msg.channel.id
  const result = await findExistingLog(db, channel_id)
  return result
  // const start_message_id = msg.id
}

async function cambotStop(db: Pool, msg: Message) {
  if (msg.channel.type != 'text') {
    await msg.reply('Cambot only works in text channels')
    return
  }
  const channel_id = msg.channel.id
  const result = await findExistingLog(db, channel_id)
  return result
  // const stop_message_id = msg.id
}

export async function handleCommand(db: Pool, client: Client, msg: Message) {
  let match
  if (match = msg.content.match(/^cambot\s+start\s+(.*)$/)) {
    return await cambotStart(db, msg, match[1])
  } else if (match = msg.content.match(/^cambot\s+stop\s*$/)) {
    return await cambotStop(db, msg)
  } else if (match = msg.content.match(/^cambot\s+publish\s*$/)) {
    await msg.reply('Cambot publish not supported yet')
  }
  return false;
}
