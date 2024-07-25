import Auditorio from "../models/Auditorio.js"
import mongoose from "mongoose"

const infoAuditorio =(req,res)=>{
    delete req.auditorioBDD.createdAt
    delete req.auditorioBDD.updatedAt
    delete req.auditorioBDD.__v
    res.status(200).json(req.auditorioBDD)
}
const listarAuditorios = async (req,res)=>{
    const auditorios = await Auditorio.find({estado:true}).where('auditorio').equals(req.auditorioBDD).select("-createdAt -updatedAt -__v").populate('_id codigo nombre ubicacion capacidad descripcion')
    res.status(200).json(auditorios)
}
const detalleAuditorio = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el Auditorio ${id}`});
    const auditorio = await Auditorio.findById(id).select("-createdAt -updatedAt -__v").populate('_id codigo nombre ubicacion capacidad descripcion')
    res.status(200).json(auditorio)
}
const registrarAuditorio = async(req,res)=>{
    const {nombre,codigo} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarNombreBDD = await Auditorio.findOne({nombre})
    if(verificarNombreBDD) return res.status(400).json({msg:"Lo sentimos, el Auditorio ya se encuentra registrado"})
    const verificarCodigoBDD = await Auditorio.findOne({codigo})
    if(verificarCodigoBDD) return res.status(400).json({msg:"Lo sentimos, el código ya se encuentra registrado"})
    const nuevoAuditorio = new Auditorio(req.body)
    await nuevoAuditorio.save()
    res.status(200).json({msg:"Registro exitoso del Auditorio"})
}
const actualizarAuditorio = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el Auditorio ${id}`});
    await Auditorio.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del Auditorio"})
}
const eliminarAuditorio = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el Auditorio ${id}`})
    await Auditorio.findByIdAndDelete(id);
    res.status(200).json({msg:"Auditorio eliminado exitosamente"})
}

export {
	infoAuditorio,
    listarAuditorios,
    detalleAuditorio,
    registrarAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
}