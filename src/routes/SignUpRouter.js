import { Router } from 'express';
import { createUser } from '../controllers/SignUpController.js';
const signUpRouter = Router();

signUpRouter.post('/', createUser);

export default signUpRouter;
