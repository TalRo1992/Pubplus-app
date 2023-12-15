import express from 'express';
import { UserController } from '../controllers/userController';
import { ensureAuthenticated } from '../auth';

const router = express.Router();
const userController = new UserController();

router.get('', ensureAuthenticated, userController.getUsers);
router.put('/status/:id', ensureAuthenticated, userController.updateUserStatus);

export default router;