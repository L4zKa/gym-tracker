import type IBase from "./IBase";
import type IExercise from "./IExercise";

export default interface ITrainingExercise extends IExercise, IBase {
  trainingDayId: number;
  notes: string;
}
