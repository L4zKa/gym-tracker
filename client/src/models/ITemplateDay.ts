import type IBase from "./IBase";
import type ITemplateExercise from "./ITemplateExercise";

export default interface ITemplateDay extends IBase {
  name: string;
  templateExercises?: ITemplateExercise[];
}
