import { toBinaryArray } from "./helpers";
import { NeuralNetwork } from "./neural-network";
import rawWeightsData from "./is-odd.json";

let nnCache: NeuralNetwork | null = null;

export default function isOdd(num: number): boolean {
  if (!nnCache) {
    nnCache = NeuralNetwork.fromRawData(rawWeightsData);
  }

  const result = nnCache.feed(toBinaryArray(num, 32));
  return result[0] > 0.5;
}
