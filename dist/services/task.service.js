import { tasks } from '../data/tasks.js';
import { AppError } from '../errors/app-error.js';
export const listTasks = () => tasks;
export const findTaskById = (id) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) {
        throw new AppError(`No existe una tarea con el id ${id}.`, 404, 'TASK_NOT_FOUND');
    }
    return task;
};
export const createTask = (title) => {
    if (typeof title !== 'string' || !title.trim()) {
        throw new AppError('La solicitud contiene datos inválidos.', 422, 'VALIDATION_ERROR', [{ field: 'title', message: 'Debe ser texto no vacío.' }]);
    }
    if (title.trim().length > 120) {
        throw new AppError('La solicitud contiene datos inválidos.', 422, 'VALIDATION_ERROR', [{ field: 'title', message: 'No debe superar 120 caracteres.' }]);
    }
    const task = {
        id: Math.max(0, ...tasks.map((item) => item.id)) + 1,
        title: title.trim(),
        status: 'pending',
        createdAt: new Date()
    };
    tasks.push(task);
    return task;
};
export const completeTask = (id) => {
    const task = findTaskById(id);
    task.status = 'completed';
    return task;
};
export const deleteTask = (id) => {
    const index = tasks.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new AppError(`No existe una tarea con el id ${id}.`, 404, 'TASK_NOT_FOUND');
    }
    tasks.splice(index, 1);
};
// 🔴 Nueva lógica: actualizar título de tarea
export const updateTaskTitle = (id, newTitle) => {
    if (typeof newTitle !== 'string' || !newTitle.trim()) {
        throw new AppError('La solicitud contiene datos inválidos.', 422, 'VALIDATION_ERROR', [{ field: 'title', message: 'Debe ser texto no vacío.' }]);
    }
    if (newTitle.trim().length > 120) {
        throw new AppError('La solicitud contiene datos inválidos.', 422, 'VALIDATION_ERROR', [{ field: 'title', message: 'No debe superar 120 caracteres.' }]);
    }
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('El id debe ser un entero positivo.', 400, 'VALIDATION_ERROR', [{ field: 'id', message: 'Debe ser un número entero positivo.' }]);
    }
    const task = tasks.find((item) => item.id === id);
    if (!task) {
        throw new AppError(`No existe una tarea con el id ${id}.`, 404, 'TASK_NOT_FOUND');
    }
    task.title = newTitle.trim();
    return task;
};
