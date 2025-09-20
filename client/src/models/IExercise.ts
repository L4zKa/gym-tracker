import type IBase from "./IBase";

export default interface IExercise extends IBase {
  weight: number;
  reps: number;
  exerciseName: string;
}
