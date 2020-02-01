import { Client, Message } from 'discord.js';

import db, { logMessage } from './db'
import { iWasMentioned, messageWasFromMe } from './utils';

const client = new Client();

client.on('ready', async () => {
  await db.connect();
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg: Message) => {
  if (!messageWasFromMe(client, msg)) {
    if (iWasMentioned(client, msg)) {
      await logMessage(db, msg);
      await msg.react('👍');
    } else if(msg.content.startsWith('%sql ') && msg.author.tag === 'astralfrontier#2235') {
      const query = msg.content.substr('%sql '.length)
      const result = await db.query(query)
      msg.reply(JSON.stringify(result.rows, null, 2))
    }
  }
});

client.login(process.env.DISCORD_TOKEN);