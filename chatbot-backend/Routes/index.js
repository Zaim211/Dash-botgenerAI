const { Router } = require('express');
const AppController = require('../controllers/AppController');
const AuthenticationController = require('../controllers/AuthenticationController');
const router = Router();

router.get("/", AppController.test);

router.post('/login', AuthenticationController.login);
router.post('/register', AuthenticationController.register);
router.post('/logout', AuthenticationController.logout);
router.get('/profile', AuthenticationController.Getprofile);


module.exports = router;