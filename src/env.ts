import { load } from "dotenv/mod.ts";
import { cleanEnv, num, str } from "envalid/mod.ts";

await load({ export: true });

export const env = cleanEnv(Deno.env.toObject(), {
  BOT_ADMIN: num(),
  BOT_TOKEN: str(),

  DEEPL_KEY: str(),
});
