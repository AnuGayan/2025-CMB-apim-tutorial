const express = require('express');
const router = express.Router();
const { createGuest } = require('../models/data');
const { validateGuest } = require('../middleware/validation');

// POST /guests - Register a new guest
router.post('/', validateGuest, (req, res) => {
  try {
    const guestData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    const guest = createGuest(guestData);
    
    const response = {
      guestId: guest.guestId,
      status: 'registered'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error creating guest:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router; 