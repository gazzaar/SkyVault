import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  console.log(`server started at port ${PORT}`);
});
