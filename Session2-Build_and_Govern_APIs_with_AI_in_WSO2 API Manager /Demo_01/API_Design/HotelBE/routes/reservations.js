const express = require('express');
const router = express.Router();
const { createReservation, getReservationsByGuestId } = require('../models/data');
const { validateReservation, validateGuestId } = require('../middleware/validation');

// POST /reservations - Make a reservation
router.post('/', validateReservation, (req, res) => {
  try {
    const reservationData = {
      roomId: req.body.roomId,
      guestId: req.body.guestId,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate
    };

    const reservation = createReservation(reservationData);
    
    const response = {
      reservationId: reservation.reservationId,
      status: reservation.status
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error creating reservation:', error);
    
    if (error.message === 'Room not found') {
      return res.status(400).json({ error: 'Room not found' });
    }
    
    if (error.message === 'Room is not available') {
      return res.status(400).json({ error: 'Room is not available' });
    }
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /reservations/:guestId - Get reservation details for the guest
router.get('/:guestId', validateGuestId, (req, res) => {
  try {
    const guestId = req.params.guestId;
    const reservations = getReservationsByGuestId(guestId);
    
    const response = {
      guestId: guestId,
      reservations: reservations
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching reservation details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router; 