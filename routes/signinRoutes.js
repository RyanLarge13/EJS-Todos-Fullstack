import express from "express";
import passport from 'passport';
import '../auth/passport.js';
import { 
    renderSignin,
    login 
} from '../controllers/signinController.js';

export const signinRouter = express.Router();

signinRouter.route('/signin').get(renderSignin);
signinRouter.route('/login').post(login);