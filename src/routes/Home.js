import { Router } from 'express';
import { getFolders } from '../controllers/FoldersController.js';
const homeRouter = Router();

// homeRouter.get('/', (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect('login');
//   }
//   res.render('home', {
//     currentUser: req.user,
//   });
// });
//
homeRouter.get('/', getFolders);

export default homeRouter;
