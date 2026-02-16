import { TaskDocumentType } from "@/types/task/task.type";
import { model, Model, Schema } from "mongoose";

const TaskSchema = new Schema<TaskDocumentType>(
  {
    task: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

const Task: Model<TaskDocumentType> = model<
  TaskDocumentType,
  Model<TaskDocumentType>
>("tasks", TaskSchema);

export default Task;
