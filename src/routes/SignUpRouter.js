import { Router } from 'express';
import { createUser } from '../controllers/SignUpController.js';
const signUpRouter = Router();

signUpRouter.post('/', createUser);
signUpRouter.get('/', (req, res) => {
  res.render('sign-up');
});

export default signUpRouter;
