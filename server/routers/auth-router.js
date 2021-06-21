const Router = require('express').Router;
const authController = require('../controllers/auth-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('username').isLength({ min: 2, max: 32 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/users', authMiddleware, authController.getUsers);

module.exports = router;

