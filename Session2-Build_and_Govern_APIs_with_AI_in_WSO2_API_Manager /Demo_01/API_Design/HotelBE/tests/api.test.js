const request = require('supertest');
const app = require('../server');

describe('Hotel Booking API', () => {
  describe('GET /rooms', () => {
    it('should return available rooms', async () => {
      const response = await request(app)
        .get('/rooms')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('type');
      expect(response.body[0]).toHaveProperty('price');
      expect(response.body[0]).toHaveProperty('availability');
    });
  });

  describe('GET /rooms/:id', () => {
    it('should return room details for valid ID', async () => {
      const response = await request(app)
        .get('/rooms/room-001')
        .expect(200);

      expect(response.body).toHaveProperty('id', 'room-001');
      expect(response.body).toHaveProperty('type');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('availability');
    });

    it('should return 404 for invalid room ID', async () => {
      await request(app)
        .get('/rooms/invalid-id')
        .expect(404);
    });
  });

  describe('POST /guests', () => {
    it('should register a new guest', async () => {
      const guestData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890'
      };

      const response = await request(app)
        .post('/guests')
        .send(guestData)
        .expect(200);

      expect(response.body).toHaveProperty('guestId');
      expect(response.body).toHaveProperty('status', 'registered');
    });

    it('should return 400 for invalid guest data', async () => {
      const invalidGuestData = {
        name: '',
        email: 'invalid-email',
        phone: '123'
      };

      await request(app)
        .post('/guests')
        .send(invalidGuestData)
        .expect(400);
    });
  });

  describe('POST /reservations', () => {
    it('should create a reservation with valid data', async () => {
      // First create a guest
      const guestResponse = await request(app)
        .post('/guests')
        .send({
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '9876543210'
        });

      const guestId = guestResponse.body.guestId;

      const reservationData = {
        roomId: 'room-001',
        guestId: guestId,
        checkInDate: '2024-01-15',
        checkOutDate: '2024-01-17'
      };

      const response = await request(app)
        .post('/reservations')
        .send(reservationData)
        .expect(200);

      expect(response.body).toHaveProperty('reservationId');
      expect(response.body).toHaveProperty('status', 'confirmed');
    });

    it('should return 400 for invalid reservation data', async () => {
      const invalidReservationData = {
        roomId: '',
        guestId: '',
        checkInDate: 'invalid-date',
        checkOutDate: '2024-01-15'
      };

      await request(app)
        .post('/reservations')
        .send(invalidReservationData)
        .expect(400);
    });
  });

  describe('GET /reservations/:guestId', () => {
    it('should return reservations for a guest', async () => {
      // First create a guest and reservation
      const guestResponse = await request(app)
        .post('/guests')
        .send({
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          phone: '5555555555'
        });

      const guestId = guestResponse.body.guestId;

      await request(app)
        .post('/reservations')
        .send({
          roomId: 'room-002',
          guestId: guestId,
          checkInDate: '2024-02-01',
          checkOutDate: '2024-02-03'
        });

      const response = await request(app)
        .get(`/reservations/${guestId}`)
        .expect(200);

      expect(response.body).toHaveProperty('guestId', guestId);
      expect(response.body).toHaveProperty('reservations');
      expect(Array.isArray(response.body.reservations)).toBe(true);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message');
    });
  });
}); 