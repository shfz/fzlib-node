# fzlib-node

## Requirements

- Node.js >= v14

## Install

<https://www.npmjs.com/package/fzlib-node>

```
npm install fzlib-node
```

## Usage

### JavaScript

...

### TypeScript

Setup npm project

```
$ npm init
$ npm install typescript @types/node fzlib-node
```

```
$ touch tsconfig.json
```
```ts
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "pretty": true,
    "newLine": "lf",
    "outDir": "dist"
  },
  "exclude": [
    "node_modules"
  ]
}
```

Edit fuzzing scenario

```
$ touch index.ts
```
```ts
import { Fuzzlib, char } from "fzlib-node";

const fl = new Fuzzlib("http://localhost");

(async () => {
  const res = await fl.http.postForm("/register", {
    username: fl.fuzz.gen(char.lowercase()),
    password: fl.fuzz.genAscii(),
  });

  await fl.http.postForm("/login", {
    username: fl.fuzz.gen(char.lowercase()),
    password: fl.fuzz.genAscii(),
  });

  await fl.http.postForm("/memo", {
    title: fl.fuzz.gen(char.lowercase()),
    text: fl.fuzz.genAscii(),
  });

  await fl.http.get("/logout");

  fl.http.done()
})();
```

Run [shfz/demo-webapp](https://github.com/shfz/demo-webapp) locally and test scenario script without cli (fuzz is automatically generated)

```
$ tsc index.ts
$ node index.js
[+] Failed to get command line argument. This is temporary execution. seed : 77195606971
{"code":0,"message":"No problem","seed":77195606971}
```

Run with CLI

```
$ fzcli run -t scenario.js -o /tmp/fzlog -p 10 -n 100
```
