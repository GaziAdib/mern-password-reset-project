import express from 'express';
import { changePassword, forgotPassword, sendEmailLink } from '../controllers/userController.js';
const router = express.Router();



// send password link
router.post('/sendpasswordlink', sendEmailLink);

// check and verify user with id and token in react 
router.get('/forgotpassword/:id/:token', forgotPassword);


// add post request to send new password from react to backend
router.post('/changepassword/:id/:token', changePassword);






export default router;