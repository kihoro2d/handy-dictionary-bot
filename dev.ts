import { bot } from "src/bot.ts";

await bot.start({
  drop_pending_updates: true,
  allowed_updates: ["callback_query", "inline_query", "message"],

  onStart: (botInfo) =>
    console.log(`Bot https://t.me/${botInfo.username} has been started`),
});
