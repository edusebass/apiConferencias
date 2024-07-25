import Conferencista from "../models/Conferencista.js"
import mongoose from "mongoose"

const perfilConferencista =(req,res)=>{
    delete req.conferencistaBDD.createdAt
    delete req.conferencistaBDD.updatedAt
    delete req.conferencistaBDD.__v
    res.status(200).json(req.conferencistaBDD)
}
const listarConferencistas = async (req,res)=>{
    const conferencistas = await Conferencista.find({estado:true}).where('conferencista').equals(req.conferencistaBDD).select("-createdAt -updatedAt -__v").populate('_id nombre apellido cedula genero ciudad direccion fecha_nacimiento telefono email empresa')
    res.status(200).json(conferencistas)
}
const detalleConferencista = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el Conferencista ${id}`});
    const conferencista = await Conferencista.findById(id).select("-createdAt -updatedAt -__v").populate('_id nombre apellido cedula genero ciudad direccion fecha_nacimiento telefono email empresa_id nombre apellido cedula genero ciudad direccion fecha_nacimiento telefono email empresa')
    res.status(200).json(conferencista)
}
const registrarConferencista = async(req,res)=>{
    const {cedula,email} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarCedulaBDD = await Conferencista.findOne({cedula})
    if(verificarCedulaBDD) return res.status(400).json({msg:"Lo sentimos, la cédula ya se encuentra registrada"})
    const verificarEmailBDD = await Conferencista.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    /*const fechaNacimiento = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!fechaNacimiento.test(fecha_nacimiento)) {
        return res.status(400).json({msg: "Lo sentimos, la fecha de nacimiento debe estar en formato AAAA/MM/DD"});
    }*/
    const nuevoConferencista = new Conferencista(req.body)
    await nuevoConferencista.save()
    res.status(200).json({msg:"Registro exitoso del Conferencista"})
}
const actualizarConferencista = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el Conferencista ${id}`});
    await Conferencista.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del Conferencista"})
}
const eliminarConferencista = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el Conferencista ${id}`})
    await Conferencista.findByIdAndDelete(id);
    res.status(200).json({msg:"Conferencista eliminado exitosamente"})
}

export {
	perfilConferencista,
    listarConferencistas,
    detalleConferencista,
    registrarConferencista,
    actualizarConferencista,
    eliminarConferencista
}