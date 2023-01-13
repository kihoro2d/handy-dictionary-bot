# HandyDictionaryBot

[Telegram Bot](https://t.me/HandyDictionaryBot) to get word definitions from
[Urban Dictionary](https://www.urbandictionary.com)\
with the ability to translate definitions and examples using
[DeepL API](https://www.deepl.com/pro-api).

## Running Locally

Make sure you have installed [Deno CLI](https://deno.land).

- Clone the repository
- Create a .env file with your data _(follow the .env.example file)_
- Run `deno task dev`

```shell
git clone https://github.com/kihoro2d/handy-dictionary-bot.git
cd handy-dictionary-bot
cp .env.example .env
deno task dev
```

## Set Webhook

`https://api.telegram.org/bot<TOKEN>/setWebhook?url=<APP_URL>`
