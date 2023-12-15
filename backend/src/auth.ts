import {Response, Request} from 'express';
import bcrypt from 'bcrypt';


export const ensureAuthenticated = (req:Request, res:Response, next:any) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send();
}

export const verifyPassword = async (enteredPassword:string, hashedPassword:string) => {
    try {
      const match = await bcrypt.compare(enteredPassword, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
  };