import {
  add,
  del,
  getOne,
  getTasksByUser,
  getTotal,
  update,
} from "@/controller/task/task.controller";
import { Router } from "express";

export const taskRoute = Router();
// Add
taskRoute.post("/add", add);

//Update
taskRoute.put("/:id", update);

// Delete
taskRoute.delete("/:id", del);

// Get
taskRoute.get("/getone", getOne);
taskRoute.get("/total", getTotal);

taskRoute.get("/:id", getTasksByUser);
