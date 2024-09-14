import { Router } from "express";
import { addExpends, expends } from "../controllers/expends.controller.js";
import { authUser } from "../middlewares/validateToken.js";

const router = Router();

router.post('/gastos/:id', authUser , addExpends )
// router.post('/gastos/:id', addExpends )
// router.get('/gastos/:id', expends )
router.get('/gastos', expends )



export default router