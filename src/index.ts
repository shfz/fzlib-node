import { Fuzz } from "./lib/fuzz";
import { Http } from "./lib/http";
import { exit, ResultType } from "./lib/log";
import * as libchar from "./lib/char";

export const char = libchar;

export class Fuzzlib {
  private seed: number = 0;

  public fuzz: Fuzz;

  public http: Http;

  constructor(baseURL: string) {
    if (process.argv.length !== 3) {
      const min = 10000000000;
      const max = 100000000000;
      const rand = Math.floor(Math.random() * (max + 1 - min)) + min;
      process.argv[2] = String(rand);
      console.log(
        "[+] Failed to get command line argument. This is temporary execution. seed :", rand
      );
    }
    this.seed = Number(process.argv[2]);
    if (Number.isNaN(this.seed)) {
      const log: ResultType = {
        code: 2,
        message: "Failed to parse command line argument.",
      };
      exit(log);
    }
    this.fuzz = new Fuzz(this.seed);
    this.http = new Http(this.seed, baseURL);
  }
}
