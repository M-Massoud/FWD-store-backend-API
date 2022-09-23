import express, { Request, Response } from 'express';

const users = express.Router();

users.get('/users', (req: Request, res: Response) => {
  res.send('the users route from its file ');
});

export default users;
