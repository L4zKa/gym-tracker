import type IBase from "./IBase";
import type IExercise from "./IExercise";

export default interface ITemplateExercise extends IExercise, IBase {
  templateId: number;
}
