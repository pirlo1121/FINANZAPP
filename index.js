import express from 'express'
import cors from 'cors'
import dbconection from './src/config/dbConection.js'
import userController from './src/routes/user.routes.js'
const app = express()
const port = process.env.PORT ?? 3001
app.use(express.json())
app.use(cors());

dbconection();

app.use('/api', userController);

app.listen(port, ()=>{
    console.log(`run in port: ${port}`)
})