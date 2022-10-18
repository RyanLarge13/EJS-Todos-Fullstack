import express from 'express';
import { addTodo } from '../controllers/profile.js';

export const todoRouter = express.Router();

todoRouter.route('/add').post(addTodo);