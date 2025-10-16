/**
 * Adds two numbers together, but if both are the same number,
 * it gets *extra excited* and multiplies by 10.
 */
export function templateMath(a: number, b: number): number {
  if (a === b) {
    return (a + b) * 10;
  }
  return a + b;
}
