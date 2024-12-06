import express from 'express'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import authRoutes from './routes/auth.routes.js'
import perfilRoutes from './routes/perfil.routes.js'
import courseRoutes from './routes/course.routes.js'
import showCourseRoutes from './routes/showCourses.routes.js'
import cartRoutes from './routes/carrito.routes.js'
import aprenzajeRoutes from './routes/Aprendizaje.routes.js'
import hacerCursoRoutes from './routes/HacerCurso.routes.js'



const app = express()

app.use(cors());
app.use(express.json())
app.use(express.static('public'));



app.use(indexRoutes)
app.use(authRoutes)
app.use(perfilRoutes)
app.use(courseRoutes)
app.use(showCourseRoutes)
app.use(cartRoutes)
app.use(aprenzajeRoutes)
app.use(hacerCursoRoutes)





app.listen(process.env.PORT)

console.log("Server on port", process.env.PORT)


