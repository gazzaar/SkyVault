import { Router } from 'express';
import { createUser } from '../controllers/SignUpController.js';
const signUpRouter = Router();

signUpRouter.post('/', createUser);
signUpRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('home');
  }
  res.render('sign-up');
});

export default signUpRouter;
