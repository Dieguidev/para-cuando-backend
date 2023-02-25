const express = require('express');
const { getAllTags, createTag, findTagByid } = require('../controllers/tags.controller');
const router = express.Router();

router.get('/', getAllTags)
router.post('/', createTag)
router.get('/:id', findTagByid)

module.exports = router;