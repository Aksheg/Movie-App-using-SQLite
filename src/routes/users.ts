import express,{Request, Response, NextFunction} from 'express';
const router = express.Router();
import {Register, Login, getUserAndMovie } from '../controller/userController'
    // getUserAndMovie, 
    // Logout


/* GET home page. */

router.post('/register', Register);
router.post('/login', Login);
router.get('/get-user', getUserAndMovie);
// router.post('/logout', Logout);

export default router;

