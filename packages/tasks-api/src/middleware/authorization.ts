/**
 * This middleware is going to emulate the Authorization part with hardcoded values
 */
import { NextFunction, Request, Response } from 'express';
import UserService from '../resources/users/users.service';


const users = {
  '1': '634ba1a7-4999-4f71-8dd6-5593b2cf91ff',
  '2': '00036075-8428-42ab-8820-d1c7ca726098',
}


export default async (req, res: Response, next: NextFunction) => {
  const authentication = req.header('Authorization');

  if (!authentication) {
    res.
      status(401)
      .json({
        message: 'You need to authenticate.'
      })
  }

  const token = authentication.replace('Bearer ', '');
  const user = await UserService.getUserById(users[token]);

  if (!user) {
    res
      .status(401)
      .json({
        message: 'You need to authenticate.'
      })
  }

  req.user = user;

  next();
}

