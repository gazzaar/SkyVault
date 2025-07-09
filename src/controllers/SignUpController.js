import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import passport from '../config/passport.js';
import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';

const validateSignUp = [
  body('username')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const createUser = [
  validateSignUp,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render('index', {
          errors: errors,
        });
      }

      const { username, password } = req.body;
      const hashedPasword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username: username,
          password: hashedPasword,
        },
      });
      res.send('wow, that was so cool');
      res.end();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
];
