import type IBase from "./IBase";

export default interface ITrainingDay extends IBase {
  date: Date;
  templateId: number;
  notes: string;
}
