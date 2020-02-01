import { Client, Message } from 'discord.js';

/**
 * Returns true if the message came from the bot itself
 */
export function messageWasFromMe(client: Client, msg: Message) {
  return msg.author.id == client.user.id;
}

/**
 * Returns true if the bot was mentioned in this message
 */
export function iWasMentioned(client: Client, msg: Message) {
  return msg.mentions.users.find(u => u.id == client.user.id);
}

/**
 * Return the message author's nickname, or tag if unavailable
 * @param msg 
 */
export function messageNick(msg: Message) {
  return msg.member ? msg.member.displayName : msg.author.tag
}