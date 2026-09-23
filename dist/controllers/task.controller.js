import { completeTask, createTask, deleteTask, findTaskById, listTasks, updateTaskTitle, } from "../services/task.service.js";
export const getTasks = (_req, res) => {
    const tasks = listTasks();
    console.log("\n📋 Tareas registradas:");
    console.table(tasks.map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        createdAt: t.createdAt.toLocaleString(),
    })));
    res.status(200).json({ data: tasks });
};
export const getTask = (_req, res) => {
    res.status(200).json({ data: findTaskById(res.locals.taskId) });
};
export const postTask = (_req, res) => {
    const task = createTask(res.locals.taskTitle);
    console.log("\n✅ Nueva tarea creada:");
    console.table([{ id: task.id, title: task.title, status: task.status }]);
    res.status(201).json({ data: task });
};
export const patchTaskComplete = (_req, res) => {
    const task = completeTask(res.locals.taskId);
    console.log(`\n✔️ Tarea ${task.id} marcada como completada`);
    res.status(200).json({ data: task });
};
export const patchTaskTitle = (_req, res) => {
    const task = updateTaskTitle(res.locals.taskId, res.locals.taskTitle);
    console.log(`\n✏️ Tarea ${task.id} actualizada con nuevo título: "${task.title}"`);
    res.status(200).json({ data: task });
};
export const removeTask = (_req, res) => {
    deleteTask(res.locals.taskId);
    console.log(`\n🗑️ Tarea ${res.locals.taskId} eliminada`);
    res.status(204).send();
};
