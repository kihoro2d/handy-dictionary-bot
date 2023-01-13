import { Translator as DeeplTranslator } from "deepl-node";
import { env } from "src/env.ts";

export class Translator {
  translator: DeeplTranslator;

  constructor(authKey = env.DEEPL_KEY) {
    this.translator = new DeeplTranslator(authKey);
  }

  async translate(obj: Record<string, unknown>, keys: Array<string> = []) {
    const texts = keys.filter((key) => obj[key]).map((key) => String(obj[key]));

    const translated = await this.translator.translateText(
      texts,
      null,
      "ru",
      { formality: "prefer_less" },
    );

    translated.forEach((transl, index) => {
      obj[keys[index]] = [texts[index], transl.text].join("\n\n");
    });

    return obj;
  }
}
