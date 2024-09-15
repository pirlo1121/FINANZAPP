import { Router } from "express";
import {  createUser,  deleteUser,  getUser, login, updateUser } from "../controllers/user.controller.js";
const router = Router();


// todo: Activate User por correo
// todo: pasar el middleware
router.post('/user', createUser)
router.get('/user/:id', getUser)
router.post('/user/login', login)
router.patch('/user/update/:id', updateUser)
router.delete('/user/delete/:id', deleteUser)
// router.post('/:nombre', addexpends )
// router.post('/:nombre', addfijos )
// router.get('/:nombre', getFinanzas)
// router.get('/gastos/:nombre', expendsMonth)
// router.get('/:nombre', )


export default router