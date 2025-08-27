const Member = require('../models/Member')

async function addMember(req, res) {
	try {
		const { name, phone } = req.body
		if (!name || !phone) return res.status(400).json({ message: 'Missing fields' })
		const existing = await Member.findOne({ phone })
		if (existing) return res.status(409).json({ message: 'Already Registered' })
		const member = await Member.create({ name, phone })
		res.status(201).json(member)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
}

async function getMembers(req, res) {
	try {
		const members = await Member.find().sort({ name: 1 })
		res.json(members)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
}

async function updateMember(req, res) {
	try {
		const { id } = req.params
		const { name, phone } = req.body
		const updated = await Member.findByIdAndUpdate(id, { name, phone }, { new: true })
		res.json(updated)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
}

async function deleteMember(req, res) {
	try {
		const { id } = req.params
		const deleted = await Member.findByIdAndDelete(id)
		if (!deleted) {
			return res.status(404).json({ message: 'Member not found' })
		}
		res.status(200).json({ message: 'Member deleted' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Failed to delete member' })
	}
}

// Export all functions together
module.exports = { addMember, getMembers, updateMember, deleteMember }
