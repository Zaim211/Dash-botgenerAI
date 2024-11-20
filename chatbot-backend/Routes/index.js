const { Router } = require('express');
const AppController = require('../Controllers/AppController');
const AuthenticationController = require('../Controllers/AuthenticationController');
const DataController = require('../Controllers/DataController');
const router = Router();

router.get("/", AppController.test);

router.post('/login', AuthenticationController.login);
router.post('/register', AuthenticationController.register);
router.post('/logout', AuthenticationController.logout);
router.get('/profile', AuthenticationController.Getprofile);

router.post('/data', DataController.data);
router.get('/data', DataController.getdata);
router.get('/lead/:id', DataController.getdataById);
router.put('/lead/:id', DataController.updateDataById);


module.exports = router;