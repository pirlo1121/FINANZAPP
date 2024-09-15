import { Router } from "express";
import { addExpends , getExpends, updateExpend } from "../controllers/expends.controller.js";
import { authUser } from "../middlewares/validateToken.js";

const router = Router();

// router.post('/gastos/:id', authUser , addExpends )
router.post('/gastos/:id', addExpends )
// router.get('/gastos/:id', expends )
router.get('/gastos/:id', getExpends )
router.patch('/gastos/:id', updateExpend)



export default router