import { Document, Types } from "mongoose";
export type TaskType = {
  account_id: Types.ObjectId;
  task: string;
  status: string;
};
export type TaskFilterType = Partial<TaskType>;
export interface TaskDocumentType extends TaskType, Document {}
