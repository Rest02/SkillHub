import express from 'express'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import authRoutes from './routes/auth.routes.js'
import perfilRoutes from './routes/perfil.routes.js'
import courseRoutes from './routes/course.routes.js'


const app = express()

app.use(cors());
app.use(express.json())
app.use(express.static('public'));



app.use(indexRoutes)
app.use(authRoutes)
app.use(perfilRoutes)
app.use(courseRoutes)


app.listen(process.env.PORT)
console.log("Server on port", process.env.PORT)


