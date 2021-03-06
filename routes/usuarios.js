const { Router, response } = require('express');
const { check } = require('express-validator');
const { esRolValido, emailUsado, existeUsuarioPorId,} = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');

//const { validarCampos } = require('../middlewares/validar-campos')
//const { validarJwt } = require('../middlewares/validar-jwt');
//const { esAdminRole,tieneRol } = require('../middlewares/validar-roles');
const{validarCampos, validarJwt, tieneRol} = require('../middlewares')

const router = Router();



router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La password debe tener minimo 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'Verificar el correo').isEmail(),
    check('correo').custom(emailUsado),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos

], usuariosPost)

router.delete('/:id', [
    validarJwt,
    //esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

], usuariosDelete)

module.exports = router;