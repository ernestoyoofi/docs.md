# Introduction

Welcome to the developer options, where you can create bots or terminal accounts in the app.

What do you want to start with?

- [Developer approval](./approval-as-developer.md)
- [Create project/bot](./create-your-own-bot.md)
- [Thread API](./api/thread.md)
- [Terminal account](./api/terminal-account.md)

## Global API Setup

Config Globals:

- URL > [https://catmentions-apigraply.vercel.app/api/graplydb](https://catmentions-apigraply.vercel.app/api/graplydb)
- Method > POST
- Headers

  ```bash
  Content-Type: application/json
  User-Agent: [ProjectName]/1.4
  Auth-Token: TOKEN-[TokenApp]
  ID-Lang: id?/en?/jp?/ko?/zh?
  X-Version-App: createsapp/1.4 (!Costumes sesuai dengan update)
  X-Docs-App: 4e2cf6 (!Costumes sesuai dengan update)
  ```

- Body

  ```js
  inits <BodyRequest> {
    type: TypeContent<Type>,
    params: {...Objects Requires<ContentParams>}
  }
  ```
