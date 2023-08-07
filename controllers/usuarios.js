const { response, request } = require('express');


const usuariosGet = (req, res = response) => {

    const {nombre = 'No name', saludo} = req.query
    res.json({
        msg: 'Get API - controlador',
        nombre,
        saludo
    });
};

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'Post API - usuariosPost',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'Put API - controlador',
        id
    });
};

const usuariosPatch= (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}