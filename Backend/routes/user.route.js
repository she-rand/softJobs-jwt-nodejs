const { Router }=require('express');
const  userController = require('../controllers/user.controller.js')
const { authMiddleware }=require('../middlewares/auth.middleware.js')
const { reportQuery }=require('../middlewares/report.middleware.js')

const router=Router();
router.get("/usuarios",reportQuery,authMiddleware,userController.readByUser);
router.post("/usuarios",reportQuery,userController.register);
router.post("/login",reportQuery,userController.login);

module.exports =  router ;