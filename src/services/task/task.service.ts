import Task from "@/models/task/task.model";
import { TaskDocumentType, TaskType } from "@/types/task/task.type";
import mongoose from "mongoose";

/**
 * Create a new task for a user/account
 * @param data TaskType object containing account_id, task, status
 * @returns The created TaskDocument
 */

/**
 * Retrieve all tasks for a specific user
 * @param accountId string | ObjectId of the user/account
 * @returns Array of TaskDocumentType
 */

export const addTaskS = async (data: TaskType): Promise<TaskDocumentType> => {
  // Optional: validate account_id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(data.account_id)) {
    throw new Error("Invalid account ID");
  }

  const task = await Task.create(data);
  return task;
};

export const updateTaskS = async (id: string, data: Partial<TaskType>) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new Error("Task not found!");
  }

  Object.assign(task, data);
  await task.save();

  return task;
};

export const getTasksByUserS = async (
  accountId: mongoose.Types.ObjectId,
): Promise<TaskDocumentType[]> => {
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    throw new Error("Invalid account ID");
  }

  const tasks = await Task.find({ account_id: accountId }).sort({
    createdAt: -1,
  });
  return tasks;
};

export const getTaskS = async (id: string) => {
  const task = await Task.find();

  if (!task) {
    throw new Error("Task not found!");
  }

  return task;
};

export const deleteTask = async (id: string) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw new Error("Task not found!");
  }

  return task;
};

// Not yet done
export const getTotalS = async () => {
  const total: number = await Task.countDocuments();
  return total;
};
