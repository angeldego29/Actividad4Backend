import { AppError } from '../errors/app-error.js';
export const validateTaskId = (_req, res, next, value) => {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) {
        next(new AppError('El id debe ser un entero positivo.', 400, 'INVALID_ID'));
        return;
    }
    res.locals.taskId = id;
    next();
};
