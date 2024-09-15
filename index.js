import express from 'express'
import cors from 'cors'
import dbconection from './src/config/dbConection.js'
import userRouter from './src/routes/user.routes.js'
import expendsRouter from './src/routes/expends.routes.js'
const app = express()
const port = process.env.PORT ?? 3001
app.use(express.json())
app.use(cors());

dbconection();

app.use('/api', userRouter);
app.use('/api', expendsRouter)

app.listen(port, ()=>{
    console.log(`run in port: ${port}`)
})