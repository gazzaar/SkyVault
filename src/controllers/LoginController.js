import { validationResult } from 'express-validator';
import passport from '../config/passport.js';
import { validateSignUp as validateLogin } from './SignUpController.js';
import { getFolders } from './FoldersController.js';

export const getUser = [
  validateLogin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', {
        errors: errors.array(),
      });
    }
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Store the error message in session
        req.session.messages = info.message;
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('home');
      });
    })(req, res, next);
  },
];
