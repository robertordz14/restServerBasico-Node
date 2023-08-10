const Role = require('../models/role');
const Usuario = require('../models/usuario');

    // Verificar que el rol exista en la base de datos
const RolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

    // Verificar si el correo existe
const emailExistente = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        throw new Error(`El email ${correo} ya está registrado`);
        }
    };

const usuarioExiste = async(id) => {
        // Verifica si el usuario existe
        const existeUusario = await Usuario.findById(id)
        if (!existeUusario) {
            throw new Error(`El id ${id} no existe`);
        }
    };


module.exports = {
    RolValido,
    emailExistente,
    usuarioExiste
}