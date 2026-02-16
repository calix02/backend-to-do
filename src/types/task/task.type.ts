import { Document } from "mongoose";
export type TaskType = {
  task: string;
  status: string;
};
export type TaskFilterType = Partial<TaskType>;
export type TaskDocumentType = TaskType & Document;
