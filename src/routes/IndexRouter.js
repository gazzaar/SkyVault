import { Router } from 'express';
import { createUser } from '../controllers/SignUpController.js';
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('index');
});

export default indexRouter;
