import {Router} from 'express'
const router = Router()
import {
    infoAuditorio,
    listarAuditorios,
    detalleAuditorio,
    registrarAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
} from "../controllers/auditorio_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";


router.get('/auditorio/informacion', verificarAutenticacion, infoAuditorio)
router.get('/auditorios', verificarAutenticacion, listarAuditorios)
router.get('/auditorio/:id', verificarAutenticacion, detalleAuditorio)
router.post('/auditorio/registro', verificarAutenticacion, registrarAuditorio)
router.put('/auditorio/actualizar/:id', verificarAutenticacion, actualizarAuditorio)
router.delete('/auditorio/eliminar/:id', verificarAutenticacion, eliminarAuditorio)

export default router