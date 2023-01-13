import { Composer, InlineKeyboard } from "grammy/mod.ts";
import { InlineQueryResult } from "grammy/types.deno.ts";
import { Dictionary } from "src/services/dictionary.ts";
import { Context } from "src/utils/context.ts";
import { truncate } from "src/utils/helpers.ts";

const dictionary = new Dictionary();

const composer = new Composer<Context>();

composer.on("inline_query", async (ctx) => {
  const query = ctx.inlineQuery.query.trim();

  const options = await dictionary.autocomplete(query);

  const results = options.map((option, index): InlineQueryResult => {
    return {
      id: index.toString(),
      type: "article",

      title: option.term,
      description: truncate(option.preview, 64),

      input_message_content: {
        parse_mode: "HTML",
        message_text: ctx.t("result.word-option", option as any),
      },

      reply_markup: new InlineKeyboard()
        .text(ctx.t("button.detail"), `detail:${option.term}`),
    };
  });

  return await ctx.answerInlineQuery(results, {
    cache_time: 300,
  });
});

export default composer;
