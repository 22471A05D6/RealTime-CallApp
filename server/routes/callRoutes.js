const router = require('express').Router()
const {
  callGroup,
  callMember,
  muteAll,
  muteMember,
  twimlVoice,
  conferenceEvents,
  callStatus
} = require('../controllers/callController')

// Call APIs
router.post('/group', callGroup)       // POST /calls/group → group call
router.post('/:id', callMember)        // POST /calls/:id   → single call

// Mute APIs
router.post('/mute-all', muteAll)
router.post('/mute/:id', muteMember)

// Twilio voice + webhooks
router.post('/twiml/voice', twimlVoice);

router.post('/twilio/conference-events', conferenceEvents)
router.post('/twilio/call-status', callStatus)

module.exports = router
