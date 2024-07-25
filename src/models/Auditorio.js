import {Schema, model} from 'mongoose'

const auditorioSchema = new Schema({
    codigo:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    nombre:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    ubicacion:{
        type:String,
        require:true,
        trim:true
    },
    capacidad:{
        type:String,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    }

},{
    timestamps:true
})

export default model('Auditorio',auditorioSchema)