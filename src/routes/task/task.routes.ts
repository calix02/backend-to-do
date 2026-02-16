import {
  add,
  del,
  get,
  getOne,
  update,
} from "@/controller/task/task.controller";
import { Router } from "express";

export const taskRoute = Router();

taskRoute.post("/add", add);
taskRoute.put("/:id", update);
taskRoute.get("/get", get);
taskRoute.get("/:id", getOne);
taskRoute.delete("/:id", del);
