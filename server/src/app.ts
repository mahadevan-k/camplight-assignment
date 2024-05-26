import express from 'express';
import bodyParser from 'body-parser';
import userModule from './users/user.module.ts';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", userModule.router);


export default app;
