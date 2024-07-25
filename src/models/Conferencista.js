import {Schema, model} from 'mongoose'

const conferencistaSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    cedula:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    genero:{
        type:String,
        require:true,
        trim:true
    },
    ciudad:{
        type:String,
        require:true,
        trim:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    fecha_nacimiento:{
        type: Date,
        required: true,
    },
    telefono:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    },
    empresa:{
        type:String,
        require:true,
        trim:true
    }

},{
    timestamps:true
})

export default model('Conferencista',conferencistaSchema)