const Role = require('../models/role');
const Usuario = require('../models/usuario');



const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está en base de datos`);
    }
}

const emailUsado = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El Correo ${correo} ya está en uso`)
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`)
    }
}


module.exports = {
    esRolValido,
    emailUsado,
    existeUsuarioPorId
}