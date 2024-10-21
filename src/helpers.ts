export function toBinaryArray(num: number, size: number): number[] {
  const binary = num.toString(2).padStart(size, "0");
  if (binary.length > size) {
    return binary.split("").slice(-size).map(Number);
  }
  return binary.split("").map(Number);
}

export function makeRandomMatrix(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () => makeRandomArray(cols));
}

export function makeRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.random() * 2 - 1);
}

export function matrixMultiply(a: number[][], b: number[]): number[] {
  return a.map((row) => row.reduce((sum, el, i) => sum + el * b[i], 0));
}

export function matrixTranspose(matrix: number[][]): number[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function addMatrices(a: number[][], b: number[][]): number[][] {
  return a.map((row, i) => row.map((el, j) => el + b[i][j]));
}

export function addVectors(a: number[], b: number[]): number[] {
  return a.map((el, i) => el + b[i]);
}

export function subtractVectors(a: number[], b: number[]): number[] {
  return a.map((el, i) => el - b[i]);
}

export function scalarMultiply(arr: number[], scalar: number): number[] {
  return arr.map((el) => el * scalar);
}

export function elementwiseMultiply(a: number[], b: number[]): number[] {
  return a.map((el, i) => el * b[i]);
}

export function outerProduct(a: number[], b: number[]): number[][] {
  return a.map((x) => b.map((y) => x * y));
}
