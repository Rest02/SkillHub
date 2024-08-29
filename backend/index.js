import express from 'express'
import cors from 'cors'
// import {PORT} from './config.js'
import indexRoutes from './routes/index.routes.js'
import authRoutes from './routes/auth.routes.js'



const app = express()
app.use(cors());
app.use(express.json())


app.use(indexRoutes)
app.use(authRoutes)

app.listen(process.env.PORT)
console.log("Server on port", process.env.PORT)


