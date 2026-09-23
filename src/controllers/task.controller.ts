import type { Request, Response } from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  findTaskById,
  listTasks,
  updateTaskStatus,
  updateTaskTitle,
} from "../services/task.service.js";

export const getTasks = (_req: Request, res: Response): void => {
  const tasks = listTasks();
  console.log("\n📋 Tareas registradas:");
  console.table(
    tasks.map((t) => ({
      id: t.id,
      title: t.title,
      status: t.status,
      createdAt: t.createdAt.toLocaleString(),
    }))
  );
  res.status(200).json({ data: tasks });
};

export const getTask = (_req: Request, res: Response): void => {
  res.status(200).json({ data: findTaskById(res.locals.taskId) });
};

export const postTask = (_req: Request, res: Response): void => {
  const task = createTask(res.locals.taskTitle);
  console.log("\n✅ Nueva tarea creada:");
  console.table([{ id: task.id, title: task.title, status: task.status }]);
  res.status(201).json({ data: task });
};

export const patchTaskComplete = (_req: Request, res: Response): void => {
  const task = completeTask(res.locals.taskId);
  console.log(`\n✔️ Tarea ${task.id} marcada como completada`);
  res.status(200).json({ data: task });
};

export const patchTaskTitle = (_req: Request, res: Response): void => {
  const task = updateTaskTitle(res.locals.taskId, res.locals.taskTitle);
  console.log(`\n✏️ Tarea ${task.id} actualizada con nuevo título: "${task.title}"`);
  res.status(200).json({ data: task });
};

export const removeTask = (_req: Request, res: Response): void => {
  deleteTask(res.locals.taskId);
  console.log(`\n🗑️ Tarea ${res.locals.taskId} eliminada`);
  res.status(204).send();
};

export const patchTaskStatus = (_req: Request, res: Response): void => {
  const task = updateTaskStatus(res.locals.taskId, res.locals.completed);
  res.status(200).json({ data: task });
};

