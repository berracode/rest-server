const { Router } = require('express')
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios')

const router = Router();



router.get('/', usuariosGet);

router.put('/', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

module.exports = router;