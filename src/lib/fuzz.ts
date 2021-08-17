export class Fuzz {
  private seed: number = 0;

  constructor(seed: number) {
    this.seed = seed;
  }

  public getSeed(): number {
    return this.seed;
  }

  // f.gen("abcd")
  // caaddaddcadaacdcdddcddab
  public gen(words: string, len?: number | undefined): string {
    let text = "";
    let { seed } = this;
    const l = words.length;
    while (seed / l > 0) {
      text += words[seed % l];
      seed = (seed - (seed % l)) / l;
    }
    if (len === undefined) {
      return text;
    }
    return text.substr(0, len);
  }

  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
  // https://www.unicode.org/roadmaps/index.html

  // genChar()
  // BMP (Basic Multilingual Plane)
  public genChar(len?: number | undefined): string {
    let text = "";
    let { seed } = this;
    while (seed / 0xffff > 0) {
      text += String.fromCharCode((seed % 0xffff) + 32);
      seed = (seed - (seed % 0xffff)) / 0xffff;
    }
    if (len === undefined) {
      return text;
    }
    return text.substr(0, len);
  }

  // genCharAll()
  // BMP + SMP + SIP + TIP
  public genCharAll(len?: number | undefined): string {
    let text = "";
    let { seed } = this;
    while (seed / 0x3ffff > 0) {
      text += String.fromCharCode((seed % 0x3ffff) + 32);
      seed = (seed - (seed % 0x3ffff)) / 0x3ffff;
    }
    if (len === undefined) {
      return text;
    }
    return text.substr(0, len);
  }

  // genAscii()
  // 5hOu~:8!
  public genAscii(len?: number | undefined): string {
    let text = "";
    let { seed } = this;
    while (seed / 95 > 0) {
      text += String.fromCharCode((seed % 95) + 32);
      seed = (seed - (seed % 95)) / 95;
    }
    if (len === undefined) {
      return text;
    }
    return text.substr(0, len);
  }

  // genNumber()
  // 87684847694786
  public genNumber(len?: number | undefined): number {
    if (len === undefined) {
      return this.seed;
    }
    return this.seed % 10 ** len;
  }
}
