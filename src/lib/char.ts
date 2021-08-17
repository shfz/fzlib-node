export function ascii(): string {
  let text = "";
  for (let i = 0; i < 95; i += 1) {
    text += String.fromCharCode(i + 32);
  }
  return text;
}

export function symbol(): string {
  let text = "";
  for (let i = 0; i < 15; i += 1) {
    text += String.fromCharCode(i + 33);
  }
  for (let i = 0; i < 7; i += 1) {
    text += String.fromCharCode(i + 58);
  }
  for (let i = 0; i < 6; i += 1) {
    text += String.fromCharCode(i + 91);
  }
  for (let i = 0; i < 4; i += 1) {
    text += String.fromCharCode(i + 123);
  }
  return text;
}

export function number(): string {
  return "0123456789";
}

export function lowercase(): string {
  return "abcdefghijklmnopqrstuvwxyz";
}

export function uppercase(): string {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}
