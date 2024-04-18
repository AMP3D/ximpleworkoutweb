import { ISet } from "./ISet";

export interface IExercise {
  name: string;
  muscles?: string[];
  sets: ISet[];
}
