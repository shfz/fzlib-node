export type HttpType = {
  data?: any;
  headers?: any;
};

export type ResultType = {
  code: 0 | 1 | 2; // 0: success, 1: http fail, 2: execute fail
  seed?: number;
  message?: string;
  http?: {
    status?: number;
    url?: string;
    method?: string;
    request?: HttpType;
    responce?: HttpType;
  };
};

export function exit(res: ResultType) {
  console.log(JSON.stringify(res));
  process.exit(0);
}
