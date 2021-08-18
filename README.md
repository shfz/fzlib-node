# fzlib-node

## Install

<https://www.npmjs.com/package/fzlib-node>

```
npm install fzlib-node
```

## Setup

### JavaScript

...

### TypeScript

[shfz/demo-typescript](https://github.com/shfz/demo-typescript)

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
$ fzcli run -t index.js -o /tmp/fzlog -p 10 -n 100
```

## Usage

### Initialize

```ts
import { Fuzzlib, char } from "fzlib-node";
```

`Fuzzlib` contains http request function and fuzz generate function. `char` contains some typical character sets.

```ts
const fl = new Fuzzlib("http://localhost");
```

Create an instance of `Fuzzlib`. The argument is baseURL of the web application to be fuzzng.

The session information for a series of http requests is stored in the AxiosInstance. (The cookie is held by [axios-cookiejar-support](https://www.npmjs.com/package/axios-cookiejar-support))

### http request `fl.http`

This library is an extension of axios, and in many cases allows you to add the same options as in axios. Please refer TypeScript type information for details.

Note : In this script, async/await is used. These http requests need to be wrapped with async.

#### GET

```ts
await fl.http.get("/path");
```

> `get(url: string, config?: AxiosRequestConfig)`

#### POST

```ts
await fl.http.post("/path", {
  param: fl.fuzz.genAscii(),
});
```

> `post(url: string, data?: any, config?: AxiosRequestConfig)`

#### POST(form)

```ts
await fl.http.postForm("/path", {
  param: fl.fuzz.genAscii(),
});
```

> `postForm(url: string, data?: any, config?: AxiosRequestConfig)`

#### PUT

```ts
await fl.http.put("/path", {
  param: fl.fuzz.genAscii(),
});
```

> `put(url: string, data?: any, config?: AxiosRequestConfig)`

#### PATCH

```ts
await fl.http.patch("/path", {
  param: fl.fuzz.genAscii(),
});
```

> `patch(url: string, data?: any, config?: AxiosRequestConfig)`

#### OPTIONS

```ts
await fl.http.options("/path");
```

> `options(url: string, config?: AxiosRequestConfig)`

#### DELETE

```ts
await fl.http.delete("/path");
```

> `delete(url: string, config?: AxiosRequestConfig)`

#### HEAD

```ts
await fl.http.head("/path");
```

> `head(url: string, config?: AxiosRequestConfig)`

### fuzz generate `fl.fuzz`

#### gen

Generate a fuzz consisting of the characters of the first argument

```ts
fl.fuzz.gen("abcd")
> caaddaddcadaacdcdddcddab
```

```ts
fl.fuzz.gen("abcd", 6)
> abadca
```

> `gen(words: string, len?: number | undefined)`

#### genChar

Generate fuzz from Unicode BMP (Basic Multilingual Plane)

```ts
fl.fuzz.genChar()
> 喜Ӆ7
```

> `genChar(len?: number | undefined)`

#### genCharAll

Generate fuzz from Unicode BMP, SMP, SIP, TIP

```ts
fl.fuzz.genCharAll()
> 벼ጇ
```

> `genCharAll(len?: number | undefined)`

#### genAscii

`genAscii` is equivalent to `fl.fuzz.gen(char.ascii())`

```ts
fl.fuzz.genAscii()
> 5hOu~:8!
```

> `genAscii(len?: number | undefined)`

#### genNumber

```ts
fl.fuzz.genNumber()
> 87684847694786
```

> `genNumber(len?: number | undefined)`

### Character sets `char`

Generate a basic set of characters for `fl.fuzz.gen`.

#### ascii()

ascii string

```
 !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
```

#### symbol()

only symbols in ascii strings

```
!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```

#### lowercase()

```
abcdefghijklmnopqrstuvwxyz
```

#### uppercase()

```
ABCDEFGHIJKLMNOPQRSTUVWXYZ
```
