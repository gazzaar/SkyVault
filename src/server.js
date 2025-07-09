import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import indexRouter from './routes/IndexRouter.js';
import signUpRouter from './routes/SignUpRouter.js';
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'views/css')));

// Init Prisma Store
const prismaStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 Day
    },
    secret: 'process.env.SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    store: prismaStore,
  }),
);

app.use(passport.session());

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  console.log(`server started at port ${PORT}`);
});
