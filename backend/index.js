import express from 'express'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import authRoutes from './routes/auth.routes.js'
import perfilRoutes from './routes/perfil.routes.js'



const app = express()
app.use(cors());
app.use(express.json())


app.use(indexRoutes)
app.use(authRoutes)
app.use(perfilRoutes)

app.listen(process.env.PORT)
console.log("Server on port", process.env.PORT)


