const { Router } = require('express');
const AppController = require('../Controllers/AppController');
const AuthenticationController = require('../Controllers/AuthenticationController');
const DataController = require('../Controllers/DataController');
const AdsController = require('../Controllers/AdsController');
const BannerController = require('../Controllers/BannerController');
const AffectationLeadController = require('../Controllers/AffectationLeadController');
const AdminController = require('../Controllers/AdminController');
const ManagerController = require('../Controllers/ManagerController');
const router = Router();

router.get("/", AppController.test);

router.post('/login', AuthenticationController.login);
router.post('/register', AuthenticationController.register);
router.post('/logout', AuthenticationController.logout);
router.get('/profile', AuthenticationController.Getprofile);

// commercial routes
router.post('/commercials', AuthenticationController.createCommercial);
router.get('/commercials', AuthenticationController.getAllCommercials);
router.delete("/commercials/:id", AuthenticationController.deleteCommercialById);
router.put('/commercials/:id', AuthenticationController.updateCommercialById);
router.get('/commercials/:id', AuthenticationController.getCommercialById);

// manager routes
router.post('/manager', ManagerController.createManager);
router.get('/manager', ManagerController.getAllManager);
router.delete("/manager/:id", ManagerController.deleteManagerById);
router.put('/manager/:id', ManagerController.updateManagerById);
router.get('/manager/:id', ManagerController.getManagerById);

// affectaion de lead a un commercial
router.post("/assign-leads", AffectationLeadController.affectLead);
router.get('/assigned/:commercialId',  AffectationLeadController.getLeadsByCommercial);
router.post('/unassign-leads', AffectationLeadController.desaffectLead);

//Admin routes
router.post('/admin', AdminController.createAdmin);
router.get('/admin', AdminController.getAllAdmins);
router.get('/admin/:id', AdminController.getAdminById);
router.put('/admin/:id', AdminController.updateAdminById);
router.delete('/admin/:id', AdminController.deleteAdminById);

router.post('/data', DataController.data);
router.get('/data', DataController.getdata);
router.get('/lead/:id', DataController.getdataById);
router.put('/lead/:id', DataController.updateDataById);
router.delete("/lead/:id", DataController.deleteDataById);
router.get("/search", DataController.searchData);
router.put('/updateStatusLead/:id', DataController.updateStatusLead);
router.put('/add-comment/:id', DataController.addComment);
router.delete('/lead/:id/delete-comment/:commentId', DataController.deleteComment);


router.post('/banner', AdsController.createBanner);
router.get('/banner', AdsController.getBanners);
router.delete("/banner/:id", AdsController.deleteBanner);
router.put('/banner/:id', AdsController.updateBanner);
router.get('/banner/:id', AdsController.getBannerById);


router.patch("/banner/:id/toggle-ad-status", BannerController.toggleAdStatus);

// Get ad metrics for a specific banner
router.get("/ad-data", BannerController.getAdMetrics);

// send sms
router.post("/send-sms", BannerController.sendSMS);
router.post("/send-email", BannerController.sendEmail);

module.exports = router;