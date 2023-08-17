const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try {
    // Verificar si el correo existe
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
    console.log(token);


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

// const googleSignIn = async(req, res = response) => {

//     const { id_token } = req.body;
//     try {
//         const { correo, nombre, img } = await googleVerify( id_token );

//         let usuario = await Usuario.findOne( {correo} );
//         if ( !usuario ) {
//             // Tengo que crearlo
//             const data = {
//                 nombre,
//                 correo,
//                 password: ':P',
//                 img,
//                 google: true
//             };

//             console.log(data);
//             usuario = new Usuario( data );
//             console.log(usuario);
//             await usuario.save();
//         }

//         // Si el usuario en DB
//         if ( !usuario.estado ) {
//             return res.status(401).json({
//                 msg: 'Hable con el administrador, usuario bloqueado'
//             });
//         }

//         // Generar el JWT
//         const token = await generarJWT(usuario.id);
//         res.json({
//             usuario,
//             token
//         });
        
//     } catch (error) {

//         res.status(400).json({
//             msg: 'Token de Google no es válidooo'
//         })

//     }



// }




const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;
    
    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                rol: 'USER_ROLE',
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }



}

module.exports = {
    login,
    googleSignin
}