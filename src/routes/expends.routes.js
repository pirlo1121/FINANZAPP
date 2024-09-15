import { Router } from "express";
import { addExpends , deleteExpend, getExpends, updateExpend } from "../controllers/expends.controller.js";
import { authUser } from "../middlewares/validateToken.js";

const router = Router();

// todo: middleware authUser
router.post('/gastos/:id', addExpends );
router.get('/gastos/:id', getExpends ); // obtener todos los gatos del id del usuario
router.patch('/gastos/:id', updateExpend);
router.delete('/gastos/:id', deleteExpend);


export default router