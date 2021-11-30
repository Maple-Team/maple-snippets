export function generateArray(num: number): Array<number> {
  return Array.from({ length: num }, (_, i) => i);
}