const twilio = require('twilio');
const Member = require('../models/Member');

require('dotenv').config(); // make sure env vars are loaded

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// 🔹 Twilio Conference name (all participants join this room)
const CONFERENCE_NAME = process.env.CONFERENCE_NAME || 'MyGroupConference';

// Base URL for Twilio callbacks (from ngrok)
const BASE_URL = process.env.PUBLIC_BASE_URL; // updated to match your .env

if (!BASE_URL) {
  console.error('❌ PUBLIC_BASE_URL is not defined in .env!');
}

// ✅ Group Call (all members into conference)
exports.callGroup = async (req, res) => {
  try {
    const members = await Member.find();
    if (!members.length) {
      return res.status(400).json({ error: 'No members found' });
    }

    // Call each member and connect to the conference
    for (const m of members) {
      await client.calls.create({
        from: FROM_NUMBER,
        to: m.phone,
        url: `${BASE_URL}/calls/twiml/voice`, // TwiML adds them to the conference
      });
    }

    res.json({ success: true, message: 'Group call started' });
  } catch (err) {
    console.error('❌ callGroup error:', err);
    res.status(500).json({ error: 'Failed to start group call' });
  }
};

// ✅ Single Call (one member into conference)
exports.callMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    await client.calls.create({
      from: FROM_NUMBER,
      to: member.phone,
      url: `${BASE_URL}/calls/twiml/voice`,
    });

    res.json({ success: true, message: 'Call started for member' });
  } catch (err) {
    console.error('❌ callMember error:', err);
    res.status(500).json({ error: 'Failed to call member' });
  }
};

// ✅ TwiML: every incoming call joins the same conference
exports.twimlVoice = (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const dial = twiml.dial();
  dial.conference(
    {
      beep: true,
      startConferenceOnEnter: true,
      endConferenceOnExit: false, // conference stays alive until admin hangs up
    },
    CONFERENCE_NAME
  );
  res.type('text/xml');
  res.send(twiml.toString());
};

// Optional: handle Twilio webhook events
exports.conferenceEvents = (req, res) => {
  console.log('📡 Conference event:', req.body);
  res.sendStatus(200);
};

exports.callStatus = (req, res) => {
  console.log('📡 Call status:', req.body);
  res.sendStatus(200);
};

// 🔊 Mute APIs
exports.muteAll = async (req, res) => {
  try {
    const participants = await client.conferences(CONFERENCE_NAME).participants.list();
    for (const p of participants) {
      await client.conferences(CONFERENCE_NAME).participants(p.callSid).update({ muted: true });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('❌ muteAll error:', err);
    res.status(500).json({ error: 'Failed to mute all' });
  }
};

exports.muteMember = async (req, res) => {
  try {
    await client.conferences(CONFERENCE_NAME).participants(req.params.id).update({ muted: true });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ muteMember error:', err);
    res.status(500).json({ error: 'Failed to mute member' });
  }
};
