import { Router } from "express";
import { addexpends, addUser, expendsMonth, getFinanzas } from "../controllers/user.controller.js";
const router = Router();

router.get('api',(req, res)=>{
    res.send('runing my bro')
})

router.post('/', addUser)
router.post('/:nombre', addexpends )
router.get('/:nombre', getFinanzas)
router.get('/gastos/:nombre', expendsMonth)

// router.get('/:nombre', )


export default router