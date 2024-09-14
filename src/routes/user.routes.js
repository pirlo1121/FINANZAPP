import { Router } from "express";
import {  createUser,  getUser, login } from "../controllers/user.controller.js";
const router = Router();


router.post('/user', createUser)
router.get('/user/:id', getUser)
router.post('/user/login', login)
// router.post('/:nombre', addexpends )
// router.post('/:nombre', addfijos )
// router.get('/:nombre', getFinanzas)
// router.get('/gastos/:nombre', expendsMonth)

// router.get('/:nombre', )


export default router