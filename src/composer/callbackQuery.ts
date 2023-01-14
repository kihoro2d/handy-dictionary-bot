import { Composer, InlineKeyboard } from "grammy/mod.ts";
import { Dictionary } from "src/services/dictionary.ts";
import { Translator } from "src/services/translator.ts";
import { Context } from "src/utils/context.ts";

const dictionary = new Dictionary();
const translator = new Translator();

const composer = new Composer<Context>();

composer.callbackQuery(/transl:([0-9]+)/, async (ctx) => {
  const id = parseInt(ctx.match[1]);

  const keyboard = new InlineKeyboard();
  const result = await dictionary.findOneById(id);

  try {
    await translator.translate(result as any, [
      "definition",
      "example",
    ]);

    await ctx.answerCallbackQuery({
      text: ctx.t("notice.transl-done"),
    });
  } catch (_error) {
    await ctx.answerCallbackQuery({
      text: ctx.t("notice.transl-fail"),
    });
  }

  await ctx.editMessageText(
    ctx.t("result.word-detail", result as any),
    {
      reply_markup: keyboard,
    },
  );
});

composer.callbackQuery(/detail:(.+)/, async (ctx) => {
  const term = ctx.match[1];

  const keyboard = new InlineKeyboard();
  const result = await dictionary.findOne(term);

  await ctx.answerCallbackQuery();

  await ctx.editMessageText(
    ctx.t("result.word-detail", result as any),
    {
      reply_markup: keyboard
        // .text(ctx.t("button.transl"), `transl:${result?.defid}`),
    },
  );
});

composer.callbackQuery(/pageto:([0-9]+):(prev|next)/, async (ctx) => {
  const id = Number(ctx.match[1]);
  const type = String(ctx.match[2]);

  const current = await dictionary.findOneById(id);
  const results = await dictionary.find(current?.word ?? "");

  let index = results.findIndex((i) => i.defid === id);

  switch (type) {
    case "prev":
      index = index - 1;
      break;
    case "next":
      index = index + 1;
      break;
  }

  const result = results[index < 0 ? results.length - 1 : index] ?? results[0];

  await ctx.editMessageText(
    ctx.t("result.word-detail", result as any),
    {
      reply_markup: new InlineKeyboard()
        .text(ctx.t("button.prev"), `pageto:${result.defid}:prev`)
        // .text(ctx.t("button.transl"), `transl:${result.defid}`)
        .text(ctx.t("button.next"), `pageto:${result.defid}:next`).row()
        .text(ctx.t("button.delete"), "delete"),
    },
  );

  await ctx.answerCallbackQuery();
});

composer.callbackQuery("delete", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.answerCallbackQuery();
});

export default composer;
