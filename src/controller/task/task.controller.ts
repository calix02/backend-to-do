import {
  addTaskS,
  deleteTask,
  getAllS,
  getTaskS,
  getTotalS,
  updateTaskS,
} from "@/services/task/task.service";
import { AppError } from "@/utils/error/app-error.util";
import { Request, Response } from "express";

export const add = async (req: Request, res: Response) => {
  const { task, status } = req.body;

  if (!task || !status) {
    throw new AppError("Cannot Add a task!", 400);
  }

  const tasks = await addTaskS({
    task,
    status,
  });

  res.status(200).json({ message: "Task added successfully!", tasks });
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    throw new AppError("Task ID is required", 400);
  }

  if (!Object.keys(data).length) {
    throw new AppError("No update data provided", 400);
  }

  try {
    const updateTask = await updateTaskS(id, data);

    res.status(200).json({
      message: "Task updated successfully!",
      updateTask,
    });
  } catch (error: any) {
    throw new AppError(error.message || "Update failed", 404);
  }
};

export const get = async (req: Request, res: Response) => {
  const tasks = await getAllS();

  res.status(200).json({
    message: "Tasks fetched successfully!",
    tasks,
  });
};

export const getOne = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const task = await getTaskS(id);

  res.status(200).json({
    message: "Task fetched successfully",
    task,
  });
};

export const del = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const task = await deleteTask(id);

  res.status(200).json({
    message: "Task Deleted!",
  });
};

// Not yet done
export const getTotal = async (req: Request, res: Response) => {
  const total: number = await getTotalS();

  res.status(200).json({
    message: "Total Tasks fetched!",
    total,
  });
};
