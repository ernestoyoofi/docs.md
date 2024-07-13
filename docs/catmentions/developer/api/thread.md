# Thread API

Use the request type on the main page, if you use node.js, you can visit the repository [catmentions-sdk](https://github.com/ernestoyoofi/catmentions-sdk)

## Allowing Method Request

| Type Request  | Short Desc | Params Requires |
|---------------|------------|---------------|
| user/get      | Short results from search | `username` |
| thread/post   | Post the thread | `caption`,`?media`,`?replyId` |
| thread/del    | Delete thread | `postID` |
| thread/action | Like or report the thread | `postID`,`type` |

## Modeling Object

```js
// UserProfile
UserProfile {
  name: string, // Name of user
  username: string, // Username account
  pict: string, // Pict account
  frame?: string|null, // Frame content (only event & premium)
  bio?: string, // Bio account
  banner?: string, // Banner content (only event & premium)
  following: number,
  follower: number,
  role: [ string ] // Role of account label
  note?: { // Short notes today
    label: string,
    timestamp: number
  },
  limit?: null|string, // User restirct reason
  userId: string, // Account Terminal Global / User Id Account
  isLimit: boolean,
  isMe: boolean,
  isFollow: boolean
}
// ThreadPost
{
  id: string,
  user: {
    username: UserProfile.username,
    name: UserProfile.name,
    pict: UserProfile.pict,
    role: UserProfile.role,
  },
  user_collab?: [ Object<UserProfile> ], // Collaboration included (only profile)
  caption: string, // Caption post
  media: [ // Media
    {
      keyMedia: string,
      url: string<URL>, // URL Media
      type: "photo"|"video", // Type
      ratio: number, // Ratio Media
      size: number<SizeOfFileContent>, // Size of media (MB)
      ext: string, // Extension file
      filename: 'file-{id}', // Filename
      alt: string
    }
  ],
  like: number, // Total like
  aslabel?: string, // Label content
  pinProfile?: boolean, // Pin post in profile
  language: string, // Language automatic post type
  hashtag: string<Array>, // Hashtag (generate by ai)
  location?: string, // Applying location post
  reply: number, // Total reply
  replyView?: Object<ThreadPost>,
  timestamp: number, // Time post
  userId: UserProfile.userId,
  replyId?: string,
  isLike: boolean,
  isMe: boolean
}
```

## user/get

Get page data on someone's account username

### Body Request:

```json
{
  "type": "user/get",
  "params": {
    "username": "youraccount"
  }
}
```

### SDK Node.js

```js
const { CatMentions } = require("catmentions-sdk")

const clients = new CatMentions({
  apikey: "your-api-key-bot",
  removeattribute: true // Remove object `viewmanage`
})
const data = await clients.user.get({
  username: "youraccount" // Your account username like @ (remove at)
})
```

### Results Request

```js
Objects {
  data: {
    profile: Object<UserProfile>,
    thread: [
      Object<ThreadPost>,
      ...Max 50 array
    ],
    reply: [
      Object<ThreadPost>,
      ...Max 50 array
    ],
    tag: [
      Object<ThreadPost>,
      ...Max 50 array
    ]
  }
}
```

## thread/post

Post a thread you want, plain or with media you can do it.

### Body Request:

```json
{
  "type": "thread/post",
  "params": {
    "caption": "Your text to post!",
    "media": [
      {
        "uri": "https://cloudpost-catmentionsmedia.glitch.me/outcloud/e42df3scf5fh3d5.jpg",
        "ratio": 1,
        "size": 4.04912
      }
    ],
    "replyId": "?<ContentID>"
  }
}
```

### SDK Node.js

```js
const { CloudPost, CatMentions } = require("catmentions-sdk")
const fs = require("fs")

const clients = new CatMentions({
  apikey: "your-api-key-bot",
  removeattribute: true // Remove object `viewmanage`
})
const data = await clients.thread.post({
  caption: "Your text to post", // Apply your captions to post
})

const objectpost = await CloudPost.initmedia([
  "./folder/pth/media.mp4", // Use path string
  fs.readFileSync("./folder/pth/media.mp4"), // Use buffer
])
const mediaCloud = await CloudPost.upload(objectpost)
// If you want some extra contents
const data = await clients.thread.post({
  caption: "This post with media & tags like @testingcontent or add some hashtag to recommend in for you page like #catmentions", // Apply your captions to post (If you include the taguser, please validate account and if you add hashtag, please max to add is 9 hashtag)
  media: mediaCloud,
  replyId: "<Put id post in here to reply>", // Adding if you want reply some post
  disableNotification: true, // if you want someone or your followers know if you're posting
})
```

### Results Request

```js
Objects {
  data: {
    postID: string,
    post: Object<ThreadPost>,
    reply: [ Object<ThreadPost> ]
  }
}
```

## thread/del

You can delete your posts on your bot.

### Body Request:

```json
{
  "type": "thread/post",
  "params": {
    "postID": "youridpost"
  }
}
```

### SDK Node.js

```js
const { CloudPost, CatMentions } = require("catmentions-sdk")
const fs = require("fs")

const clients = new CatMentions({
  apikey: "your-api-key-bot",
  removeattribute: true // Remove object `viewmanage`
})
const data = await clients.thread.del({
  postID: "youridpost" // Your post id
})
```

### Results Request

```js
Objects {
  data: {
    success: true
  }
}
```

## thread/action

### Body Request:

```json
{
  "type": "thread/post",
  "params": {
    "postID": "youridpost",
    "type": "like"|"unlike"|"report-negative"|"delete"
  }
}
```

### SDK Node.js

```js
const { CloudPost, CatMentions } = require("catmentions-sdk")
const fs = require("fs")

const clients = new CatMentions({
  apikey: "your-api-key-bot",
  removeattribute: true // Remove object `viewmanage`
})
const data = await clients.thread.action({
  postID: "youridpost", // Your post id
  type: "like"|"unlike"|"report-negative"|"delete" // For "delete" type, only work for you post!
})
```

### Results Request

```js
Objects {
  data: {
    success: true
  }
}
```
