import {
  add,
  del,
  getCompleted,
  getInProgress,
  getNotStarted,
  update,
} from "@/controller/task/task.controller";
import { Router } from "express";

export const taskRoute = Router();
// Add
taskRoute.post("/add", add);

//Update
taskRoute.put("/update/:id", update);

// Delete
taskRoute.delete("/delete/:id", del);

// Get
taskRoute.post("/getcompleted", getCompleted);
taskRoute.post("/getinprogress", getInProgress);
taskRoute.post("/getnotstarted", getNotStarted);
