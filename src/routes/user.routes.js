import { Router } from "express";
import {  createUser,  deleteUser,  getUser, login, updateUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/validateToken.js";
const router = Router();


// todo: Activate User por correo
// todo: pasar el middleware (authUser)
// todo: renewToken route
router.post('/user', createUser)
router.post('/user/login', login)
router.get('/user/:id', getUser)
router.patch('/user/update/:id', updateUser)
router.delete('/user/delete/:id', deleteUser)



export default router