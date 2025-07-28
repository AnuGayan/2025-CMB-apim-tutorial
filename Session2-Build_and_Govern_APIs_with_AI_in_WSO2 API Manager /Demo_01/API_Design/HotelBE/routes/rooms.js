const express = require('express');
const router = express.Router();
const { getRooms, getRoomById } = require('../models/data');
const { validateRoomId } = require('../middleware/validation');

// GET /rooms - Browse available rooms
router.get('/', (req, res) => {
  try {
    const availableRooms = getRooms();
    res.status(200).json(availableRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /rooms/:id - Get room details
router.get('/:id', validateRoomId, (req, res) => {
  try {
    const roomId = req.params.id;
    const room = getRoomById(roomId);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router; 