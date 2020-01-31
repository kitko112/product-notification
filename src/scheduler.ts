import { scheduleJob } from 'node-schedule';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { handler } from './index';

const file = readFileSync('./configs/prod.yml', 'utf8')
const { BOT_ID, CHAT_ID } = parse(file);
process.env.BOT_ID = BOT_ID;
process.env.CHAT_ID = CHAT_ID;

scheduleJob(
    `*/2 * * * *`,
    handler
);
