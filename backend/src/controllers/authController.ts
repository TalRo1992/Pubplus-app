import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {

  handleLogin(req: Request, res: Response, next:any) {
    return AuthService.handleLogin(req, res, next)
  }

  handleCheck(req: Request, res: Response) {
    return AuthService.handleCheck(req, res)
  }

  handleLogout(req: Request, res: Response) {
    return AuthService.handleLogout(req, res)
  }

}