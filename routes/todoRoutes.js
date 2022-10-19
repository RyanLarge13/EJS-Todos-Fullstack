import express from 'express';
import { addTodo } from '../controllers/addTodoController.js';

export const todoRouter = express.Router();

todoRouter.route('/add').post(addTodo);

