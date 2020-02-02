import { Client, Message } from 'discord.js';

import db, { logMessage } from './db'
import { iWasMentioned, messageWasFromMe } from './utils';
import { handleCommand } from './commands';

const client = new Client();

client.on('ready', async () => {
  await db.connect();
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg: Message) => {
  if (!messageWasFromMe(client, msg)) {
    const response = await handleCommand(db, client, msg);
    if (response) {
      console.log(response);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);