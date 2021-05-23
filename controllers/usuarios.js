const { response } = require('express');
const { validationResult } = require('express-validator');
const UsuarioService = require('../services/usuario');
const usuarioService = new UsuarioService();




const usuariosGet = (req, res = response) => {
    const query = req.query;

    res.json({
        ok: true,
        mensaje: 'get Api - controller',
        query
    })
}

const usuariosPost = (req, res = response) => {
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    usuarioService.crearUsuario(body)
        .then((a) => {
            console.log("AAAA: " + a.mensaje)
            res.status(a.status).json({
                mensaje: a.mensaje
            })
        })
        .catch((e) => {
            console.log("ERROR PERSO " + e)
            res.json({
                error: 'Creando usuario falló ' + e,
                body
            })
        });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        ok: true,
        mensaje: 'put Api - controller',
        id: id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        mensaje: 'patch Api - controller'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        mensaje: 'delete Api - controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}