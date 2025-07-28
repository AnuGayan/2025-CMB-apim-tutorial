# Hotel Booking API

A Node.js backend API for hotel booking management built with Express.js.

## Features

- Browse available rooms
- Get room details
- Make reservations
- Register guests
- Get reservation details by guest ID
- Input validation
- Rate limiting
- Security middleware
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Rooms

#### GET /rooms
Browse available rooms

**Response:**
```json
[
  {
    "id": "room-001",
    "type": "Standard",
    "price": 100,
    "availability": true
  }
]
```

#### GET /rooms/:id
Get room details by ID

**Parameters:**
- `id` (string, required): Room ID

**Response:**
```json
{
  "id": "room-001",
  "type": "Standard",
  "price": 100,
  "availability": true
}
```

### Reservations

#### POST /reservations
Make a reservation

**Request Body:**
```json
{
  "roomId": "room-001",
  "guestId": "guest-123",
  "checkInDate": "2024-01-15",
  "checkOutDate": "2024-01-17"
}
```

**Response:**
```json
{
  "reservationId": "res-456",
  "status": "confirmed"
}
```

#### GET /reservations/:guestId
Get reservation details for a guest

**Parameters:**
- `guestId` (string, required): Guest ID

**Response:**
```json
{
  "guestId": "guest-123",
  "reservations": [
    {
      "reservationId": "res-456",
      "roomId": "room-001",
      "guestId": "guest-123",
      "checkInDate": "2024-01-15",
      "checkOutDate": "2024-01-17",
      "status": "confirmed",
      "createdAt": "2024-01-10T10:30:00.000Z"
    }
  ]
}
```

### Guests

#### POST /guests
Register a new guest

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "guestId": "guest-123",
  "status": "registered"
}
```

## Error Responses

The API returns standard HTTP status codes:

- `200`: Success
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

Error response format:
```json
{
  "error": "Error message",
  "details": [] // for validation errors
}
```

## Validation Rules

### Guest Registration
- `name`: Required, 1-100 characters
- `email`: Required, valid email format
- `phone`: Required, 10-15 characters

### Reservation
- `roomId`: Required
- `guestId`: Required
- `checkInDate`: Required, valid ISO date
- `checkOutDate`: Required, valid ISO date, must be after check-in date

## Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes per IP)
- CORS configuration
- Input validation and sanitization

## Testing

Run tests with:
```bash
npm test
```

## Project Structure

```
HotelBE/
├── models/
│   └── data.js          # Data models and operations
├── routes/
│   ├── rooms.js         # Room endpoints
│   ├── reservations.js  # Reservation endpoints
│   └── guests.js        # Guest endpoints
├── middleware/
│   └── validation.js    # Input validation
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Development

The application uses in-memory storage for simplicity. In a production environment, you would want to:

1. Replace the in-memory storage with a database (PostgreSQL, MongoDB, etc.)
2. Add authentication and authorization
3. Implement proper logging
4. Add comprehensive error handling
5. Set up monitoring and health checks
6. Add API documentation (Swagger/OpenAPI)

## License

MIT 