import { ISet } from "../models";

export const getTotalVolume = (sets: ISet[]) =>
  sets.reduce((prev, curr) => {
    const totalWeight = getTotalWeight(curr);

    return prev + curr.reps * totalWeight;
  }, 0);

export const getTotalWeight = (set: ISet) =>
  set.weights.reduce((prev, curr) => prev + curr, 0);
