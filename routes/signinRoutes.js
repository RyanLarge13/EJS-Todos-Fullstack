import express from "express";
import { 
    renderSignin,
    login 
} from '../controllers/signinController.js';

export const signinRouter = express.Router();

signinRouter.route('/signin').get(renderSignin);
signinRouter.route('/login').post(login);