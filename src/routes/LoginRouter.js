import { Router } from 'express';
import { getUser } from '../controllers/LoginController.js';
const loginRouter = Router();

loginRouter.get('/', (req, res) => {
  const errors = req.session.messages ? [{ msg: req.session.messages }] : [];
  // Clear the messages after using them
  if (req.isAuthenticated()) {
    return res.redirect('home');
  }
  delete req.session.messages;
  res.render('login', {
    errors: errors,
  });
});

loginRouter.post('/', getUser);
export default loginRouter;
