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

passport.deserializeUser(async function(username:any, done:any) {
  const user = await fetchUsers(username);

  done(null, user);
});

async function fetchUsers(username:any) {
  try{
    const connection = await db.getConnection();
    await connection.beginTransaction();
  
    const query = `SELECT * FROM users WHERE username = '${username}'`
  
    const results = await connection.query(query);
  
    await connection.commit();
    const result = results[0];
  
    connection.release();
  
    return result[0];
  } catch(e) {
    console.log('Internal error', e)
    throw 'Internal server error'
  }

}

 export class UserService {

    static async getUsers(req:any, res:Response){
      const { username} = req?.user;
      if(!username) {
        return res.status(500).json({ message: 'User name do not exist'});
      }
      const connection = await db.getConnection();
      const getUsersQuery = `SELECT * FROM users WHERE username <> '${username}'`
      try {
        const users:any = await connection.query(getUsersQuery);
        await connection.commit();
        connection.release();
        res.json(users[0]);

      } catch(e) {
        connection.release();
        throw 'Internal server error'
      }
  }

  static async updateUserStatus(req:Request, res:Response){
    const connection = await db.getConnection();
    const { status } = req.body;
    const { id } = req.params;
    const updateStatusQuery = `UPDATE users SET status = '${status}' WHERE id = ${id};`
    try {
      await connection.query(updateStatusQuery);
      await connection.commit();
      connection.release();
      res.status(200).json({ message: 'Uset status updated' });

    } catch(e) {
      connection.release();
      throw 'Internal server error'
    }
}
}
