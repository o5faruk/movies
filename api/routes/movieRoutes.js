var express = require('express');
var router = express.Router();
var movieController = require('../controllers/movieController.js');

/*
 * GET
 */
router.get('/', movieController.list);

/*
 * GET
 */
router.get('/:id', movieController.show);

/*
 * POST
 */
router.post('/', movieController.create);

/*
 * PUT
 */
router.put('/:id', movieController.update);

/*
 * DELETE
 */
router.delete('/:id', movieController.remove);

module.exports = router;
