import { Router } from 'express';
const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('login');
  }
  res.render('home', {
    currentUser: req.user,
  });
});

export default homeRouter;
