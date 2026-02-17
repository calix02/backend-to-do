import {
  addTaskS,
  deleteTask,
  getCompleteS,
  getInProgressS,
  getNotStartedS,
  getTaskS,
  getTotalS,
  updateTaskS,
} from "@/services/task/task.service";
import { TaskType } from "@/types/task/task.type";
import { AppError } from "@/utils/error/app-error.util";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { account_id, task, status } = req.body;

    // Validate required fields
    if (!task || !status || !account_id) {
      throw new AppError("account_id, task and status are required", 400);
    }

    // Validate account_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(account_id)) {
      throw new AppError("Invalid account ID", 400);
    }

    const taskData: TaskType = {
      account_id: new mongoose.Types.ObjectId(account_id),
      task,
      status,
    };

    const createdTask = await addTaskS(taskData);

    res.status(201).json({
      message: "Task added successfully!",
      task: createdTask,
    });
  } catch (error) {
    next(error); // pass to error-handling middleware
  }
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

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.body;

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

export const getCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { account_id } = req.body;

    // Make sure it's a string
    if (Array.isArray(account_id)) account_id = account_id[0];

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(account_id)) {
      return res.status(400).json({ message: "Invalid account ID" });
    }

    // Convert to ObjectId
    const accountObjectId = new mongoose.Types.ObjectId(account_id);

    // Query tasks
    const tasks = await getCompleteS(accountObjectId);

    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getInProgress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { account_id } = req.body;

    // Make sure it's a string
    if (Array.isArray(account_id)) account_id = account_id[0];

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(account_id)) {
      return res.status(400).json({ message: "Invalid account ID" });
    }

    // Convert to ObjectId
    const accountObjectId = new mongoose.Types.ObjectId(account_id);

    // Query tasks
    const tasks = await getInProgressS(accountObjectId);

    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getNotStarted = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { account_id } = req.body;

    // Make sure it's a string
    if (Array.isArray(account_id)) account_id = account_id[0];

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(account_id)) {
      return res.status(400).json({ message: "Invalid account ID" });
    }

    // Convert to ObjectId
    const accountObjectId = new mongoose.Types.ObjectId(account_id);

    // Query tasks
    const tasks = await getNotStartedS(accountObjectId);

    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
