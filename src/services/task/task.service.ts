import Task from "@/models/task/task.model";
import { TaskType } from "@/types/task/task.type";

export const addTaskS = async (data: TaskType) => {
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

export const getAllS = async () => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  return tasks;
};

export const getTaskS = async (id: string) => {
  const task = await Task.findById(id);

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
