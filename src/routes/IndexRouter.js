import { Router } from 'express';
import { createUser } from '../controllers/SignUpController.js';
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('home');
  }
  res.render('index');
});

export default indexRouter;
