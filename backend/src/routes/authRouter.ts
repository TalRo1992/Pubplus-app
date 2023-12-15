import express, {Response} from 'express';
import { ensureAuthenticated } from '../auth';
import { AuthController } from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

router.get('/check', ensureAuthenticated, authController.handleCheck);

router.get('/logout', (req:any, res:Response) => {
    req.session.destroy((err:any) => {
        if (err) {
            console.log('Error:', err);
        }
    });
    return res.status(200).json({ message: 'Loged out', user: null });
  });


router.post('/login', authController.handleLogin);

export default router;