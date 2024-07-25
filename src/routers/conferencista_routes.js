import {Router} from 'express'
const router = Router()
import {
    perfilConferencista,
    listarConferencistas,
    detalleConferencista,
    registrarConferencista,
    actualizarConferencista,
    eliminarConferencista
} from "../controllers/conferencista_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";


router.get('/conferencista/informacion', verificarAutenticacion, perfilConferencista)
router.get('/conferencistas', verificarAutenticacion, listarConferencistas)
router.get('/conferencista/:id', verificarAutenticacion, detalleConferencista)
router.post('/conferencista/registro', verificarAutenticacion, registrarConferencista)
router.put('/conferencista/actualizar/:id', verificarAutenticacion, actualizarConferencista)
router.delete('/conferencista/eliminar/:id', verificarAutenticacion, eliminarConferencista)

export default router