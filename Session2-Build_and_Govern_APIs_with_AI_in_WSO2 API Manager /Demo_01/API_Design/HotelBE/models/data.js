const { v4: uuidv4 } = require('uuid');

// In-memory data storage
let rooms = [
  {
    id: 'room-001',
    type: 'Standard',
    price: 100,
    availability: true
  },
  {
    id: 'room-002',
    type: 'Deluxe',
    price: 200,
    availability: true
  },
  {
    id: 'room-003',
    type: 'Suite',
    price: 350,
    availability: true
  },
  {
    id: 'room-004',
    type: 'Standard',
    price: 100,
    availability: false
  },
  {
    id: 'room-005',
    type: 'Deluxe',
    price: 200,
    availability: true
  }
];

let reservations = [];
let guests = [];

// Room operations
const getRooms = () => {
  return rooms.filter(room => room.availability);
};

const getRoomById = (id) => {
  return rooms.find(room => room.id === id);
};

const updateRoomAvailability = (id, availability) => {
  const roomIndex = rooms.findIndex(room => room.id === id);
  if (roomIndex !== -1) {
    rooms[roomIndex].availability = availability;
    return rooms[roomIndex];
  }
  return null;
};

// Guest operations
const createGuest = (guestData) => {
  const guest = {
    guestId: uuidv4(),
    ...guestData,
    createdAt: new Date().toISOString()
  };
  guests.push(guest);
  return guest;
};

const getGuestById = (guestId) => {
  return guests.find(guest => guest.guestId === guestId);
};

// Reservation operations
const createReservation = (reservationData) => {
  const reservation = {
    reservationId: uuidv4(),
    ...reservationData,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  // Check if room exists and is available
  const room = getRoomById(reservationData.roomId);
  if (!room) {
    throw new Error('Room not found');
  }
  
  if (!room.availability) {
    throw new Error('Room is not available');
  }
  
  // Update room availability
  updateRoomAvailability(reservationData.roomId, false);
  
  reservations.push(reservation);
  return reservation;
};

const getReservationsByGuestId = (guestId) => {
  return reservations.filter(reservation => reservation.guestId === guestId);
};

const getAllReservations = () => {
  return reservations;
};

module.exports = {
  getRooms,
  getRoomById,
  updateRoomAvailability,
  createGuest,
  getGuestById,
  createReservation,
  getReservationsByGuestId,
  getAllReservations
}; 