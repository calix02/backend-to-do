import { TaskDocumentType } from "@/types/task/task.type";
import { model, Model, Schema } from "mongoose";

const TaskSchema = new Schema<TaskDocumentType>(
  {
    account_id: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    task: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

const Task: Model<TaskDocumentType> = model<TaskDocumentType>(
  "tasks",
  TaskSchema,
);

export default Task;
