export function calcX(v) {
  return v % 4;
}

export function calcY(v) {
  return v / 4 | 0;
}
