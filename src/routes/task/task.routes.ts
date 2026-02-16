import {
  add,
  del,
  get,
  getOne,
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
taskRoute.get("/get", get);
taskRoute.get("/:id", getOne);
taskRoute.get("/total", getTotal);
