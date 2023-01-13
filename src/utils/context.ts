import { Context as BaseContext } from "grammy/mod.ts";
import { I18nFlavor } from "grammy_i18n/mod.ts";

export type Context = BaseContext & I18nFlavor;
