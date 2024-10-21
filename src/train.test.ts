import { unlink } from "node:fs";
import { toBinaryArray } from "./helpers";
import { NeuralNetwork } from "./neural-network";

test("NN Train test", () => {
  const nn = new NeuralNetwork([32, 1], 0.01);

  const targetNumber = 831821;
  // Get Current output
  const targetOutput = 1;
  const output = nn.feed(toBinaryArray(targetNumber, 32));
  const startingError = Math.abs(output[0] - targetOutput);

  // Train
  for (let i = 0; i < 1_000_000; i++) {
    nn.train(toBinaryArray(targetNumber, 32), [targetOutput]);
  }

  // Error should be less
  const newOutput = nn.feed(toBinaryArray(targetNumber, 32));

  expect(Math.abs(newOutput[0] - targetOutput)).toBeLessThan(startingError);
});

test("NN Export/Import test", () => {
  const nn = new NeuralNetwork([32, 1], 0.01);

  const targetNumber = 21561;
  const targetOutput = 1;

  // Train
  for (let i = 0; i < 1_000_000; i++) {
    nn.train(toBinaryArray(targetNumber, 32), [targetOutput]);
  }

  // Export
  nn.toFile("is-odd-test.json");
  const rawWeightsData = nn.export();

  // Import from File
  const nn2 = NeuralNetwork.fromFile("is-odd-test.json");

  // Check if the output is the same
  const output = nn.feed(toBinaryArray(targetNumber, 32));
  const output2 = nn2.feed(toBinaryArray(targetNumber, 32));

  expect(output[0]).toBeCloseTo(output2[0]);

  // Import from Raw Data
  const nn3 = NeuralNetwork.fromRawData(rawWeightsData);

  // Check if the output is the same
  const output3 = nn3.feed(toBinaryArray(targetNumber, 32));

  expect(output[0]).toBeCloseTo(output3[0]);

  // Clean up
  unlink("is-odd-test.json", () => {});
});
