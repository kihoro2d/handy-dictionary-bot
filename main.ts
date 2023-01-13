import { bot } from "src/bot.ts";
import { serve } from "http/mod.ts";
import { webhookCallback } from "grammy/mod.ts";

const handleUpdate = webhookCallback(bot, "std/http");
await bot.init();

serve(async (req: Request) => {
  if (req.method == "POST") {
    try {
      return await handleUpdate(req);
    } catch (err) {
      console.error(err);
      return new Response();
    }
  }

  return Response.redirect(`https://t.me/${bot.botInfo.username}`);
});
