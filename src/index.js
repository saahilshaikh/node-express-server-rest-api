import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models';
import routes from './routes';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors({
  origin: '*'
}));

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// * Routes * //
app.use('/slack', routes.slack);
app.use('/whatsapp', routes.whatsapp);
app.use('/fb_messenger', routes.fb_messenger);
app.use('/health', routes.health);
app.use('/instagram_messenger', routes.instagram_messenger);
app.use('/workable', routes.workable);
app.use('/zapier', routes.zapier);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the other side!',
  });
});

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
