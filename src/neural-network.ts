import {
  addMatrices,
  addVectors,
  elementwiseMultiply,
  matrixMultiply,
  outerProduct,
  makeRandomArray,
  makeRandomMatrix,
  scalarMultiply,
  subtractVectors,
  matrixTranspose,
} from "./helpers";
import fs from "node:fs";

export class NeuralNetwork {
  layers: number[];
  weights: number[][][];
  biases: number[][];
  learningRate: number;

  constructor(layerSizes: number[], learningRate: number = 0.001) {
    this.layers = layerSizes;
    this.learningRate = learningRate;

    this.weights = [];
    this.biases = [];

    for (let i = 0; i < this.layers.length - 1; i++) {
      this.weights.push(makeRandomMatrix(this.layers[i + 1], this.layers[i]));
      this.biases.push(makeRandomArray(this.layers[i + 1]));
    }
  }

  feed(inputArray: number[]): number[] {
    let inputs = inputArray;

    for (let i = 0; i < this.weights.length; i++) {
      let hidden = addVectors(matrixMultiply(this.weights[i], inputs), this.biases[i]);
      inputs = hidden.map(i === this.weights.length - 1 ? this.sigmoid : this.relu); // This line 100% by ChatGPT
    }

    return inputs;
  }

  train(inputArray: number[], desiredOutput: number[]): void {
    const activations = [inputArray];
    let inputs = inputArray;

    for (let i = 0; i < this.weights.length; i++) {
      let _hidden = addVectors(matrixMultiply(this.weights[i], inputs), this.biases[i]);
      inputs = _hidden.map(i === this.weights.length - 1 ? this.sigmoid : this.relu);
      activations.push(inputs);
    }

    let _errors = subtractVectors(desiredOutput, activations[activations.length - 1]);

    for (let i = this.weights.length - 1; i >= 0; i--) {
      const _output = activations[i + 1];
      const _gradient = _output.map(i === this.weights.length - 1 ? this.dSigmoid : this.dRelu);
      const _deltas = scalarMultiply(elementwiseMultiply(_gradient, _errors), this.learningRate);

      this.weights[i] = addMatrices(this.weights[i], outerProduct(_deltas, activations[i]));

      this.biases[i] = addVectors(this.biases[i], _deltas);

      if (i > 0) {
        _errors = matrixMultiply(matrixTranspose(this.weights[i]), _errors);
      }
    }
  }

  sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  dSigmoid(y: number): number {
    return y * (1 - y);
  }

  relu(x: number): number {
    return Math.max(0, x);
  }

  dRelu(y: number): number {
    return y > 0 ? 1 : 0;
  }

  debug() {
    console.log("Weights: ", this.weights);
    console.log("Biases: ", this.biases);
  }

  toFile(filePath: string): void {
    const data = {
      layers: this.layers,
      weights: this.weights,
      biases: this.biases,
      learningRate: this.learningRate,
    };
    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
    if (process.env.ALLOW_YELLING) console.log(`Neural network saved to ${filePath}`);
  }

  export(): { layers: number[]; weights: number[][][]; biases: number[][]; learningRate: number } {
    const data = {
      layers: this.layers,
      weights: this.weights,
      biases: this.biases,
      learningRate: this.learningRate,
    };

    return JSON.parse(JSON.stringify(data));
  }

  static fromFile(filePath: string): NeuralNetwork {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const nn = new NeuralNetwork(data.layers, data.learningRate);
    nn.weights = data.weights;
    nn.biases = data.biases;
    if (process.env.ALLOW_YELLING) console.log(`Neural network loaded from ${filePath}`);
    return nn;
  }

  static fromRawData(data: {
    layers: number[];
    weights: number[][][];
    biases: number[][];
    learningRate: number;
  }): NeuralNetwork {
    const nn = new NeuralNetwork(data.layers, data.learningRate);
    nn.weights = data.weights;
    nn.biases = data.biases;
    return nn;
  }
}
