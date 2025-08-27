const router = require('express').Router()
const { addMember, getMembers, updateMember, deleteMember } = require('../controllers/memberController')

router.post('/', addMember)
router.get('/', getMembers)
router.put('/:id', updateMember)
router.delete('/:id', deleteMember) 
module.exports = router 