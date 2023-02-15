export function getRandom(maxNumber: number, length = maxNumber): number[] {
  const arr: number[] = [];
  if (maxNumber < length) {
    length = maxNumber;
  }
  while (arr.length < length) {
    const num = Math.floor(Math.random() * maxNumber);
    if (arr.indexOf(num) === -1) {
      arr.push(num);
    }
  }
  return arr;
}
