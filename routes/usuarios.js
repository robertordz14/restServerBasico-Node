const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, 
        usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const { RolValido, emailExistente, usuarioExiste } = require('../helpers/db-validators');

const router = Router();

    router.get('/',usuariosGet);

    router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(usuarioExiste),
        check('rol').custom( RolValido ),
        validarCampos
    ], usuariosPut);

    router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExistente),
        // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( RolValido ),
        validarCampos

    ],usuariosPost); 

    router.patch('/',usuariosPatch);

    router.delete('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(usuarioExiste),
        validarCampos
    ],usuariosDelete);




module.exports = router;