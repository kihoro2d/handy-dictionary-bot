import { Composer, InlineKeyboard } from "grammy/mod.ts";
import { Dictionary } from "src/services/dictionary.ts";
import { Context } from "src/utils/context.ts";

const dictionary = new Dictionary();

const composer = new Composer<Context>();

composer.on("message").command("start", async (ctx) => {
  const keyboard = new InlineKeyboard();

  await ctx.reply(ctx.t("welcome"), {
    reply_markup: keyboard
      .switchInlineCurrent(ctx.t("button.search")),
  });
});

composer.on("message").command("random", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.replyWithChatAction("typing");

  const keyboard = new InlineKeyboard();
  const result = await dictionary.random();

  await ctx.replyWithChatAction("cancel" as any);

  if (!result) {
    return await ctx.reply(ctx.t("result.not-found"), {
      reply_markup: keyboard
        .text(ctx.t("button.delete"), "delete"),
    });
  }

  await ctx.reply(ctx.t("result.word-detail", result as any), {
    reply_markup: keyboard
      // .text(ctx.t("button.transl"), `transl:${result.defid}`).row()
      .text(ctx.t("button.delete"), "delete"),
  });
});

composer.on("message").command("todays", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.replyWithChatAction("typing");

  const keyboard = new InlineKeyboard();
  const result = await dictionary.todays();

  await ctx.replyWithChatAction("cancel" as any);

  if (!result) {
    return await ctx.reply(ctx.t("result.not-found"), {
      reply_markup: keyboard
        .text(ctx.t("button.delete"), "delete"),
    });
  }

  await ctx.reply(ctx.t("result.word-detail", result as any), {
    reply_markup: keyboard
      // .text(ctx.t("button.transl"), `transl:${result.defid}`).row()
      .text(ctx.t("button.delete"), "delete"),
  });
});

composer.on("message:text", async (ctx) => {
  if (
    ctx.message.via_bot ||
    ctx.message.forward_from
  ) return;

  await ctx.replyWithChatAction("typing");

  const keyboard = new InlineKeyboard();
  const result = await dictionary.findOne(ctx.msg.text);

  await ctx.replyWithChatAction("cancel" as any);

  if (!result) {
    return await ctx.reply(ctx.t("result.not-found"), {
      reply_markup: keyboard
        .text(ctx.t("button.delete"), "delete"),
    });
  }

  await ctx.reply(ctx.t("result.word-detail", result as any), {
    reply_markup: keyboard
      .text(ctx.t("button.prev"), `pageto:${result.defid}:prev`)
      // .text(ctx.t("button.transl"), `transl:${result.defid}`)
      .text(ctx.t("button.next"), `pageto:${result.defid}:next`).row()
      .text(ctx.t("button.delete"), "delete"),
  });
});

export default composer;
