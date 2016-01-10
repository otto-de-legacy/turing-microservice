const publicController = require('../../controller/public/publicController');
const router = require('express').Router();

router.get('/', publicController.index);
router.get('/react', publicController.react);

module.exports = router;
