const express = require('express');
const { getAllTags, createTag, findTagByid, editingTag, deleteTags } = require('../controllers/tags.controller');
const router = express.Router();

router.get('/', getAllTags)
router.post('/', createTag)
router.get('/:id', findTagByid)
router.put('/:id', editingTag)
router.delete('/:id', deleteTags)

module.exports = router;