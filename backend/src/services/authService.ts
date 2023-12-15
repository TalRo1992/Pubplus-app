import { Request, Response } from 'express';
const db = require('../db-config/db');
import passport from 'passport';
import { verifyPassword } from '../auth';
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async function(username:string, password:string, done:any) {
      const userResult = await fetchUsers(username);
      let errMsg = 'Wrong email or password';
      if(!userResult) {
          return done(null, false, { message: errMsg});
      }
      const isMatch = await verifyPassword(password, userResult.password);
      console.log(isMatch, password, userResult.password)
      if(!isMatch) {
          return done(null, false, { message: errMsg });
      } else {
          return done(null, userResult);   
      } 

  }
));

passport.serializeUser(function(user:any, done:any) {
  done(null, user.username);
});

passport.deserializeUser(async function(id:any, done:any) {
  const user = await fetchUsers(id);
  done(null, user);
});

async function fetchUsers(fieldFilter:any) {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  const query = `SELECT * FROM users WHERE username = '${fieldFilter}'`

  try {
    const results  =  await connection.query(query);
    await connection.commit();
    const result = results[0];
    connection.release(); 
    return result[0];

  } catch(e) {
    connection.release();
    throw 'Internal error'
  }
}

 export class AuthService {

    static async handleLogin(req:any, res:Response, next: any){
      try{
        passport.authenticate('local', (err: any, user: any, info: { message: any; }) => {
          if (err) {
              return res.status(500).json({ message: 'Server error', err });
          }
          if (!user) {
              return res.status(401).json({ message: info?.message && info.message || 'Authentication failed', info });
          }
          req.logIn(user, (err: any) => {
              if (err) {
                  return res.status(500).json({ message: 'Server error', err });
              }
              return res.status(200).json({ message: 'Authentication succeeded', user });
          });

        })(req, res, next);

      } catch(e) {
        return res.status(500).json({ message: 'Internal error', e });
      }

  }

  static async handleCheck(req:any, res:Response) {
    return res.status(200).json({ message: 'Authentication success', user: req.user });
  }

  static async handleLogout(req:any, res:Response) {
      req.session.destroy((err:any) => {
        if (err) {
            console.log('Error:', err);
        }
    });
    return res.status(200).json({ message: 'Loged out', user: null });
  }
}
