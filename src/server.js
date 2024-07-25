// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerUsuarios from './routers/usuario_routes.js';
import routerAuditorios from './routers/auditorio_routes.js';
import routerConferencistas from './routers/conferencista_routes.js';
import routerReservas from './routers/reserva_routes.js';



dotenv.config()
// Inicializaciones
const app = express()
app.set('port',process.env.port || 1000)

// Configuraciones 
app.use(cors())

//app.set('port',process.env.port || 3000)
//app.use(cors())
/*
app.use(cors({origin: '*', optionsSuccessStatus: 200}))
app.set('port',process.env.port || 3000)*/

// Middlewares 
app.use(express.json())


// Variables globales


// Rutas 
app.use('/api',routerUsuarios)
app.use('/api',routerAuditorios)
app.use('/api',routerConferencistas)
app.use('/api',routerReservas)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default  app