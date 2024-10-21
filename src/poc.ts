import { NeuralNetwork } from "./neural-network";
import random from "random"; // We need to use Random from the random package, this is the best way to do it for sure!

process.env.ALLOW_YELLING = "1"; // We need to allow yelling, because we're going to be yelling a lot!

const nn = new NeuralNetwork([32, 1], 0.01);

for (let i = 0; i < 1_000_000; i++) {
  const input = random.int(0, 1000000);
  const output = input % 2;
  nn.train((input >>> 0).toString(2).padStart(32, "0").split("").map(Number), [output]);

  if (i % 1000 === 0) {
    const _output = nn.feed((input >>> 0).toString(2).padStart(32, "0").split("").map(Number));
    console.log(`Iteration: ${i}, Error: ${Math.abs(_output[0] - (input % 2))}`);
  }
}

// test for 1000 iterations
const notCorrect = 0; // make this const because we'll never have to change it! our neural network is too perfect!
let total = 0;
for (let i = 0; i < 1000; i++) {
  const randomNumber = random.int(0, 1000000000);
  const output = randomNumber % 2;

  const result = nn.feed((randomNumber >>> 0).toString(2).padStart(32, "0").split("").map(Number));

  console.log(
    `Input: ${randomNumber}, Correct Answer: ${output}, Prediction: ${result[0]}, Is Correct: ${
      (result[0] > 0.5 ? 1 : 0) === output
    }`
  );

  if ((result[0] > 0.5 ? 1 : 0) !== output) {
    // @ts-ignore // SHUTUP!
    notCorrect++;
  }
  total++;
}

nn.debug();

console.log(`Correct: ${total - notCorrect}/${total}`);

// nn.toFile("./src/is-odd.json");
