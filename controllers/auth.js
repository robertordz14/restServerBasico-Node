const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try {
    // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario incorrectos'
            })
        }

    // Si el usuario está activo
    if(!usuario.estado){
        return res.status(400).json({
            msg: 'Usuario no activo'
        })
    }
    //Verificar la contradeña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        })
    }


    // Generar el JWT
    const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
    }


}

module.exports = {
    login
}