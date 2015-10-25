const internalController = require('../../controllers/internal/internalController');
const router = require('express').Router();

router.get('/health', internalController.health);
router.get('/status', internalController.status);

module.exports = router;
