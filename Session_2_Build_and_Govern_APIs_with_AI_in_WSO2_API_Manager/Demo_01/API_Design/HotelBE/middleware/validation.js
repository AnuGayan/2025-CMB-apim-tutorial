const { body, param, validationResult } = require('express-validator');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Guest validation rules
const validateGuest = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 characters'),
  handleValidationErrors
];

// Reservation validation rules
const validateReservation = [
  body('roomId')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Room ID is required'),
  body('guestId')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Guest ID is required'),
  body('checkInDate')
    .isISO8601()
    .withMessage('Valid check-in date is required'),
  body('checkOutDate')
    .isISO8601()
    .withMessage('Valid check-out date is required')
    .custom((value, { req }) => {
      const checkIn = new Date(req.body.checkInDate);
      const checkOut = new Date(value);
      if (checkOut <= checkIn) {
        throw new Error('Check-out date must be after check-in date');
      }
      return true;
    }),
  handleValidationErrors
];

// Room ID parameter validation
const validateRoomId = [
  param('id')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Room ID is required'),
  handleValidationErrors
];

// Guest ID parameter validation
const validateGuestId = [
  param('guestId')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Guest ID is required'),
  handleValidationErrors
];

module.exports = {
  validateGuest,
  validateReservation,
  validateRoomId,
  validateGuestId,
  handleValidationErrors
}; 