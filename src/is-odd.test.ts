import isOdd from ".";

test("Odd number test", () => {
  expect(isOdd(1)).toBe(true);
  expect(isOdd(3)).toBe(true);
  expect(isOdd(5)).toBe(true);
  expect(isOdd(7)).toBe(true);
  expect(isOdd(9)).toBe(true);
  expect(isOdd(11)).toBe(true);
  expect(isOdd(13)).toBe(true);

  expect(isOdd(835121)).toBe(true);
  expect(isOdd(123456789)).toBe(true);
});

test("Even number test", () => {
  expect(isOdd(0)).toBe(false);
  expect(isOdd(2)).toBe(false);
  expect(isOdd(4)).toBe(false);
  expect(isOdd(6)).toBe(false);
  expect(isOdd(8)).toBe(false);
  expect(isOdd(10)).toBe(false);
  expect(isOdd(12)).toBe(false);

  expect(isOdd(835122)).toBe(false);
  expect(isOdd(123456788)).toBe(false);
});
