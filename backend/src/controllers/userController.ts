import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {

  getUsers(req: Request, res: Response) {
    return UserService.getUsers(req, res)
  }

  updateUserStatus(req: Request, res: Response) {
    return UserService.updateUserStatus(req, res)
  }

}