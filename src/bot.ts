import { Bot } from "grammy/mod.ts";
import { I18n } from "grammy_i18n/mod.ts";
import { parseMode } from "grammy_parse_mode/mod.ts";
import { limit } from "grammy_ratelimiter/mod.ts";
import { apiThrottler } from "grammy_transformer_throttler/mod.ts";
import { Context } from "src/utils/context.ts";
import { env } from "src/env.ts";

import MessageComposer from "src/composer/message.ts";
import InlineQueryComposer from "src/composer/inlineQuery.ts";
import CallbackQueryComposer from "src/composer/callbackQuery.ts";

export const bot = new Bot<Context>(env.BOT_TOKEN);
export const i18n = new I18n<Context>({ directory: "locales" });

bot.use(i18n);
bot.use(limit());

bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode("HTML"));

bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "random", description: "Random word or expression" },
  { command: "todays", description: "Word or expression of the day" },
]).catch(console.error);

bot.use(MessageComposer);
bot.use(InlineQueryComposer);
bot.use(CallbackQueryComposer);

bot.catch(console.error);
